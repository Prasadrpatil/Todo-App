import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Modal,
  Input,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Todo.css";
import db from "./firebase";
import DeleteIconForever from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const updateTodo = () => {
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };
  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <h1>I am a Modal</h1>
          <Input
            placeholder={props.todo.todo}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button variant="contained" color="primary" onClick={updateTodo}>
            Update Todo
          </Button>
        </div>
      </Modal>
      <List>
        <ListItem>
          <ListItemText
            primary={"➡️" + props.todo.todo}
            secondary="📆 Dummy Deadline "
          ></ListItemText>
        </ListItem>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => setOpen(true)}
        >
          Edit Me
        </Button>
        <DeleteIconForever
          onClick={(event) =>
            db.collection("todos").doc(props.todo.id).delete()
          }
        />
      </List>
    </>
  );
}

export default Todo;
