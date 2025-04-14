const express = require("express");
const router = express.Router();
const Committee = require("../models/committee");

// Create a new committee
router.post("/", async (req, res) => {
  try {
    const committee = new Committee(req.body);
    await committee.save();
    res.status(201).json(committee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all committees
router.get("/", async (req, res) => {
  try {
    const committees = await Committee.find();
    res.status(200).json(committees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific committee by ID
router.get("/:id", async (req, res) => {
  try {
    const committee = await Committee.findById(req.params.id);
    if (!committee) {
      return res.status(404).json({ message: "Committee not found" });
    }
    res.status(200).json(committee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a committee by ID
router.put("/:id", async (req, res) => {
  try {
    const committee = await Committee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!committee) {
      return res.status(404).json({ message: "Committee not found" });
    }
    res.status(200).json(committee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a committee by ID
router.delete("/:id", async (req, res) => {
  try {
    const committee = await Committee.findByIdAndDelete(req.params.id);
    if (!committee) {
      return res.status(404).json({ message: "Committee not found" });
    }
    res.status(200).json({ message: "Committee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
