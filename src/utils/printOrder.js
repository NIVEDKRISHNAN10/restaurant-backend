const escpos = require("escpos");
escpos.Network = require("escpos-network");

const printToDevice = (items, order, printerIP, title) => {
  return new Promise((resolve, reject) => {
    try {
      const device = new escpos.Network(printerIP);
      const printer = new escpos.Printer(device);

      device.open(() => {
        printer
          .align("CT")
          .text("MY RESTAURANT")
          .text("-----------------------------")
          .align("LT")
          .text(`Order: ${order._id}`)
          .text(`Table: ${order.tableNumber || "-"}`)
          .text(`Time: ${new Date().toLocaleString()}`)
          .text("-----------------------------")
          .text("ITEMS");

        items.forEach(item => {
          printer.text(`${item.name} x${item.qty}`);
        });

        printer
          .text("-----------------------------")
          .align("CT")
          .text(`*** ${title} ***`)
          .cut()
          .close();

        resolve();
      });

    } catch (err) {
      reject(err);
    }
  });
};


const printOrder = async (order) => {
  const items = order.items || [];

  // 🔥 Split inside function
  const barItems = items.filter(i => i.type === "bar");
  const foodItems = items.filter(i => i.type === "food");

  const tasks = [];

  // 🔥 Send to BAR printer
  if (barItems.length > 0) {
    tasks.push(
      printToDevice(
        barItems,
        order,
        process.env.BAR_PRINTER_IP,
        "BAR COPY"
      )
    );
  }

  // 🔥 Send to KITCHEN printer
  if (foodItems.length > 0) {
    tasks.push(
      printToDevice(
        foodItems,
        order,
        process.env.KITCHEN_PRINTER_IP,
        "KITCHEN COPY"
      )
    );
  }

  // 🔥 Run both in parallel
  await Promise.all(tasks);
};

module.exports = printOrder;