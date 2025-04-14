const express = require("express");
const router = express.Router();
const Year = require("../models/year");

// Create a new year
router.post("/", async (req, res) => {
  try {
    const year = new Year(req.body);
    await year.save();
    res.status(201).json(year);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all years
router.get("/", async (req, res) => {
  try {
    const years = await Year.find();
    res.status(200).json(years);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific year by ID
router.get("/:id", async (req, res) => {
  try {
    const year = await Year.findById(req.params.id);
    if (!year) {
      return res.status(404).json({ message: "Year not found" });
    }
    res.status(200).json(year);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a year by ID
router.put("/:id", async (req, res) => {
  try {
    const year = await Year.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!year) {
      return res.status(404).json({ message: "Year not found" });
    }
    res.status(200).json(year);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a year by ID
router.delete("/:id", async (req, res) => {
  try {
    const year = await Year.findByIdAndDelete(req.params.id);
    if (!year) {
      return res.status(404).json({ message: "Year not found" });
    }
    res.status(200).json({ message: "Year deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
