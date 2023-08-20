//Fetching User All Notes And Then User Adding a New Notes. (\***/)
const express = require("express");
const router = express.Router();
const fatchuserdata = require("../middleware/fatchuserdata");
//import Models notes
const Notes = require("../Models/Notes");
const { body, validationResult } = require("express-validator");

// Creating Route: 1 - GET Fetch User All Notes, Using : GET "/api/note/fetchallnotes". Login required.
try {
  router.get("/fetchallnotes", fatchuserdata, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  });
} catch (error) {
  console.error(error.message); //retrun user a error message to console.
  res.status(500).send("Something Error Occured");
}

// Creating Route: 2 - User Add a New Notes, Using : POST "/api/note/addnotes". Must be Login required.
router.post(
  "/addnotes",
  fatchuserdata,
  [
    //Add New Notes.
    body("title", "title must be 3 charecters").isLength({ min: 3 }),
    body("description", "description must be atleast 5 charecters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      //if there are errors, then retruns 400 bad request for errors.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //User Add a New Note Using Title, Descripttion and Tag.
      const { title, description, tag } = req.body;
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });

      //Create a save Note Mathod when
      const savedNotes = await notes.save();
      res.json(savedNotes);
    } catch (error) {
      console.error(error.message); //retrun user a error message to console.
      res.status(500).send("Something Error Occured");
    }
  }
);

//Creating Route: 3 - Updating Note User update his note, Using : PUT "/api/note/updatenote/:id". Must be Login required.
router.put("/updatenote/:id", fatchuserdata, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    //Create a New Note Object..
    const newNotes = {}; // This is a Object.
    //User Update This Part When User Need to Update.
    if (title) {
      newNotes.title = title;
    }
    if (description) {
      newNotes.description = description;
    }
    if (tag) {
      newNotes.tag = tag;
    }
    //Find User Note What is a Update?
    let notes = await Notes.findById(req.params.id);
    //when Not find any notes then showing this error.
    if (!notes) {
      return res.status(404).send("not found");
    }
    //user can only update allowed to his/her Notes.
    if (notes.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    //Find and Update Note and send the new Notes as a response
    notes = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNotes },
      { new: true }
    );
    res.json({ notes });
  } catch (error) {
    console.error(error.message); //retrun user a error message to console.
    res.status(500).send("Something Error Occured");
  }
});

//Creating Route: 4  - Deleting Note User delete his note, Using : delete "/api/note/deletenote/:id". Must be Login required.
router.delete("/deletenote/:id", fatchuserdata, async (req, res) => {
  try {
    //Find User Note What is a Delete?
    let notes = await Notes.findById(req.params.id);
    //when Not find any notes then showing this error.
    if (!notes) {
      return res.status(404).send("Not Found Anything");
    }
    //user can only update allowed to his/her Notes.
    if (notes.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    //User Find her Notes and Allow to Delete her only his/her Notes.
    notes = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", notes: notes });
  } catch (error) {
    console.error(error.message); //retrun user a error message to console.
    res.status(500).send("Something Error Occured");
  }
});

module.exports = router;
