import { useState } from "react";
import { v4 as uuid } from "uuid";

import {
  Container,
  ToDoList,
  Input,
  Button,
  ListItem,
  Trash,
  Check,
} from "./styles.js";

function App() {
  const [list, setList] = useState([]);
  const [inputTask, setInputTask] = useState("");

  function inputChange(event) {
    setInputTask(event.target.value);
  }

  function buttonClick() {
    if(inputTask){
      setList([...list, { id: uuid(), task: inputTask, finished: false }]);
    }
  }

  function finishTarefa(id) {
    const newList = list.map((item) =>
      item.id === id ? { ...item, finished: !item.finished } : item
    );

    setList(newList);
  }

  function deleteTarefa(id) {
    const newList = list.filter((item) => item.id !== id);

    setList(newList);
  }

  return (
    <Container>
      <ToDoList>
        <Input onChange={inputChange} placeholder="O que tenho que fazer..." />
        <Button onClick={buttonClick}>Adicionar</Button>

        <ul>
          {list.length > 0 ? (
            list.map((item) => (
              <ListItem isFinished={item.finished} key={item.id}>
                <Check onClick={() => finishTarefa(item.id)} />
                <li>{item.task}</li>
                <Trash onClick={() => deleteTarefa(item.id)} />
              </ListItem>
            ))
          ) : (
            <h3>Não há itens na lista </h3>
          )}
        </ul>
      </ToDoList>
    </Container>
  );
}

export default App;
