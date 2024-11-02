const express = require("express");
const router = express.Router();
const Admin = require("../modules/admin");

// GET /admin/pending
router.get("/sadmin/pending", async (req, res) => {
  try {
    const pendingAdmins = await Admin.find({ status: "pending" });
    res.json(pendingAdmins);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch pending admins" });
  }
});

// PUT /admin/update-status/:id
router.put("/admin/update-status/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // "approved" or "rejected"

  try {
    const admin = await Admin.findByIdAndUpdate(id, { status }, { new: true });
    if (admin) {
      res.json({ message: "Admin status updated", admin });
    } else {
      res.status(404).json({ error: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update admin status" });
  }
});

module.exports = router;
