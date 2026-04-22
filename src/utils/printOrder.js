const escpos = require("escpos");
escpos.Network = require("escpos-network");
const orderItem = require("../models/orderItems");

// 🔥 Common bill format
const formatBill = (items, order, title) => {
  let output = "";

  output += "MY RESTAURANT\n";
  output += "-----------------------------\n";
  output += `Order: ${order._id}\n`;
  output += `Table: ${order.tableNumber || "-"}\n`;
  output += `Time: ${new Date().toLocaleString()}\n`;
  output += "-----------------------------\n";

items.forEach(item => {
  const volume = item.volume
    ? ` (${item.volume})`
    : item.pegs
    ? ` (${item.pegs} pegs)`
    : "  Nos";

  output += `${item.name} x ${item.quantity}${volume}\n`;
});

  output += "-----------------------------\n";
  output += `*** ${title} ***\n\n`;

  return output;
};

// 🔥 Print function
const printToDevice = (items, order, printerIP, title, preview = false) => {
  return new Promise((resolve, reject) => {

    // 👉 PREVIEW (Postman testing)
    if (preview) {
      console.log(`\n===== ${title} =====\n`);
      console.log(formatBill(items, order, title));

      return resolve({
        type: title,
        content: formatBill(items, order, title)
      });
    }

    // 👉 REAL PRINT
    const device = new escpos.Network(printerIP);
    const printer = new escpos.Printer(device);

    device.open((error) => {
      if (error) return reject(error);

      printer
        .align("CT")
        .text("MY RESTAURANT")
        .text("-----------------------------")
        .align("LT")
        .text(`Order: ${order._id}`)
        .text(`Table: ${order.tableNumber || "-"}`)
        .text(`Time: ${new Date().toLocaleString()}`)
        .text("-----------------------------");

  items.forEach(item => {
  console.log("item");
  console.log(item);

  const volume = item.volume
    ? ` (${item.volume})`
    : item.pegs
    ? ` (${item.pegs} pegs)`
    : " Nos";

  printer.text(`${item.name} x ${item.quantity}${volume}`);
});

      printer
        .text("-----------------------------")
        .align("CT")
        .text(`*** ${title} ***`)
        .cut()
        .close();

      resolve();
    });
  });
};

// 🔥 MAIN FUNCTION (Separate Bills)
const printOrder = async (order, preview = false) => {
  const items = order.items || [];
  const orderItems = await orderItem.find({ order_id: order._id });
  if(!orderItems){
    return res.status(400).json({ status: false,message: "the order is not found" });
  }
  const barItems = orderItems.filter(i => i.type === "bar");
  const kitchenItems = orderItems.filter(i => i.type === "food");
console.log("orderItems");
console.log(barItems, kitchenItems);
  const results = {};

  // 👉 BAR BILL
  if (barItems.length > 0) {
    results.bar = await printToDevice(
      barItems,
      order,
      process.env.BAR_PRINTER_IP,
      "BAR BILL",
      preview
    );
  }

  // 👉 KITCHEN BILL
  if (kitchenItems.length > 0) {
    results.kitchen = await printToDevice(
      kitchenItems,
      order,
      process.env.KITCHEN_PRINTER_IP,
      "KITCHEN BILL",
      preview
    );
  }

  return results;
};

module.exports = printOrder;