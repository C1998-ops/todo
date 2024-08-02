import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CHANGE_STATUS } from "../Services/Api_Routes_Helper";
import axios from "axios";
const TodoContainer = ({ todos, editTodo, removeItem }) => {
  const [todoItems, setTodoItems] = useState({
    todos: [],
    inprogress: [],
    done: [],
  });
  useEffect(() => {
    if (todos) {
      const todosList = todos.filter(
        (data) => !data.is_complete && !data.is_done
      );
      const taskinprogress = todos?.filter(
        (data) => !data.is_complete && data.is_done
      );
      const taskdone = todos?.filter((data) => data.is_complete);

      setTodoItems({
        todos: todosList,
        inprogress: taskinprogress,
        done: taskdone,
      });
    }
  }, [todos]);
  async function handleStatusChange(id, status) {
    try {
      const respone = await axios.post(
        `${CHANGE_STATUS}/${id}`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (respone.status === 200) {
        console.log(respone);
      } else if (respone.status === 404) {
        throw new Error("task not updated");
      }
    } catch (error) {
      console.error("task not updated", error);
    }
  }
  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return; // if Dropped outside a droppable area

    if (source.droppableId === destination.droppableId) {
      // Moving within the same list
      const items = reorder(
        todoItems[source.droppableId],
        source.index,
        destination.index
      );
      setTodoItems((prevState) => ({
        ...prevState,
        [source.droppableId]: items,
      }));
    } else {
      try {
        await handleStatusChange(draggableId, true);
      } catch (error) {
        console.error("Error moving task", error);
      } finally {
        const result = move(
          todoItems[source.droppableId],
          todoItems[destination.droppableId],
          source,
          destination
        );
        setTodoItems({
          ...result,
        });
      }
      // Moving to a different list
    }
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);

    return {
      ...todoItems,
      [droppableSource.droppableId]: sourceClone,
      [droppableDestination.droppableId]: destClone,
    };
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="todo-container">
        <DroppableContainer
          id="todos"
          title="Todo's"
          items={todoItems.todos}
          editTodo={editTodo}
          removeItem={removeItem}
        />
        <DroppableContainer
          id="inprogress"
          title="In-Progress"
          items={todoItems.inprogress}
          editTodo={editTodo}
          removeItem={removeItem}
        />
        <DroppableContainer
          id="done"
          title="Done"
          items={todoItems.done}
          editTodo={editTodo}
          removeItem={removeItem}
        />
      </div>
    </DragDropContext>
  );
};
const DroppableContainer = ({ id, title, items, editTodo, removeItem }) => (
  <Droppable droppableId={id}>
    {(provided) => (
      <section className="sub_container">
        <div className="container_header">
          <h4>{title}</h4>
        </div>
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="todo-list"
        >
          {items.map((data, index) => (
            <Draggable key={data._id} draggableId={data._id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <TodoItem
                    index={index}
                    title={data.title}
                    description={data.description}
                    createdAt={data.createdAt}
                    id={data._id}
                    edit={editTodo}
                    removeItem={removeItem}
                    disableDelete={id === "done"}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      </section>
    )}
  </Droppable>
);
export default TodoContainer;
