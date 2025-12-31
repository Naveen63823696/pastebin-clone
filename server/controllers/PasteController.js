const Paste = require("../models/paste");
const { nanoid } = require("nanoid");

// CREATE PASTE
exports.createPaste = async (req, res) => {
  try {
    const { content, expiresAt, maxViews } = req.body;

    const paste = new Paste({
      content,
      pasteId: nanoid(8),
      expiresAt,
      maxViews,
    });

    await paste.save();
    res.status(201).json(paste);
  } catch (err) {
    res.status(500).json({ message: "Error creating paste" });
  }
};

// GET PASTE
exports.getPaste = async (req, res) => {
  try {
    const paste = await Paste.findOne({ pasteId: req.params.id });

    if (!paste) return res.status(404).json({ message: "Paste not found" });

    // Expiry by time
    if (paste.expiresAt && paste.expiresAt < new Date()) {
      return res.status(410).json({ message: "Paste expired" });
    }

    // Expiry by views
    if (paste.maxViews && paste.views >= paste.maxViews) {
      return res.status(410).json({ message: "Paste expired" });
    }

    paste.views += 1;
    await paste.save();

    res.json({ content: paste.content });
  } catch (err) {
    res.status(500).json({ message: "Error fetching paste" });
  }
};
