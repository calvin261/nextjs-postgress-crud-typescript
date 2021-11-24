import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Button, Card, Form, Grid, Icon, Confirm } from "semantic-ui-react";
import { Task } from "src/interfaces/Task";
import { useRouter } from "next/router";
import Layout from "src/components/Layout";
export default function NewPage() {
  const router = useRouter();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setTask({ ...task, [name]: value });
  const creatTask = async (task: Task) => {
    await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
  };
  const updateTask = async (id: String, task: Task) => {
    await fetch("http://localhost:3000/api/tasks/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
  };
  const handleDelete = async (id: String) => {
    try {
      await fetch("http://localhost:3000/api/tasks/" + id, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const loadTask = async (id: String) => {
    const res = await fetch("http://localhost:3000/api/tasks/" + id);
    const task = await res.json();
    setTask({ title: task.title, description: task.description });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (router.query.id) {
        if (typeof router.query.id === "string")
          await updateTask(router.query.id, task);
      } else {
        await creatTask(task);
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof router.query.id === "string") loadTask(router.query.id);
  }, [router.query]);
  return (
    <Layout>
      <Grid
        centered
        columns={3}
        verticalAlign="middle"
        style={{ height: "70%" }}
      >
        <Grid.Column>
          <Card>
            <Card.Content>
              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  <label htmlFor="title"> Title: </label>
                  <input
                    type="text"
                    placeholder="Write your Title"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="descripcion"> Descripcion: </label>
                  <textarea
                    name="description"
                    rows={2}
                    value={task.description}
                    onChange={handleChange}
                    placeholder="Write your Description"
                  ></textarea>
                </Form.Field>
                {router.query.id ? (
                  <Button>
                    <Icon name="save" />
                    Update
                  </Button>
                ) : (
                  <Button>
                    <Icon name="save" />
                    Save
                  </Button>
                )}
              </Form>
            </Card.Content>
          </Card>

          {router.query.id && (
            <Button color="red" onClick={() => setOpenConfirm(true)}>
              Delete
            </Button>
          )}
        </Grid.Column>
      </Grid>
      <Confirm
        header="Delete a task"
        content={`Are you sure you want to delete this task ${router.query.id}`}
        open={openConfirm}
        onCancel={() => setOpenConfirm(false)}
        onConfirm={() =>
          typeof router.query.id === "string" && handleDelete(router.query.id)
        }
      />
    </Layout>
  );
}
