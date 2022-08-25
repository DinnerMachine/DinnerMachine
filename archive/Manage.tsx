import React, { useState } from "react";

export function Recipe(props: {
  name: string;
  dates: string;
  time: string;
  rating: string;
}) {
  return (
    <Table.Row>
      <Table.Cell>{props.name}</Table.Cell>
      <Table.Cell>{props.dates}</Table.Cell>
      <Table.Cell>{props.time}</Table.Cell>
      <Table.Cell>{props.rating}</Table.Cell>
    </Table.Row>
  );
  return (
    <Table.Row>
      <Table.Cell>{props.name}</Table.Cell>
      <Table.Cell>{props.dates}</Table.Cell>
      <Table.Cell>{props.time}</Table.Cell>
      <Table.Cell>{props.rating}</Table.Cell>
    </Table.Row>
  );
}

function Recipes() {
  let recipes = [];
  for (let i = 0; i < 10; i++) {
    recipes.push(
      Recipe({
        name: `Recipe ${i}`,
        dates: "8/19/2022",
        time: "1 hour",
        rating: "5",
      })
    );
  }
  return recipes;
}

type RecipeType = {
  name: string;
  dates: string;
  time: string;
  rating: string;
};

function Manage() {
  const columns = [
    { name: "Name", uid: "name" },
    { name: "Dates", uid: "dates" },
    { name: "Time to Cook", uid: "time" },
    { name: "Rating", uid: "rating" },
    { name: "Actions", uid: "actions" },
  ];

  function renderCell(item: RecipeType, key: React.Key) {
    if (key === "actions") {
      return (
        <Row justify="center" align="center">
          <Col css={{ d: "flex" }}>
            <Tooltip content="Edit recipe">
              <IconButton onClick={() => console.log("Edit recipe")}>
                <EditIcon size={20} fill="#979797" />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: "flex" }}>
            <Tooltip
              content="Delete recipe"
              color="error"
              onClick={() => console.log("Delete recipe")}
            >
              <IconButton>
                <DeleteIcon size={20} fill="#FF0080" />
              </IconButton>
            </Tooltip>
          </Col>
        </Row>
      );
    }
    return item[key];
  }

  async function load({ signal, cursor }) {
    // If no cursor is available, then we're loading the first page.
    // Otherwise, the cursor is the next URL to load, as returned from the previous page.
    const res = await fetch(
      cursor || "https://swapi.py4e.com/api/people/?search=",
      { signal }
    );
    const json = await res.json();
    console.log(signal);
    console.log(cursor);
    console.log(json.results);
    console.log(json.next);
    return {
      items: [
        { name: "Pizza", dates: "8/19/2022", time: "1 hour", rating: "5" },
      ],
      cursor: json.next,
    };
  }
  const list = useAsyncList({ load });

  return (
    <div className="App">
      <h1>Manage Recipes</h1>
      <Recipe name="Pizza" dates="8/19/2022" time="1 hour" rating="5" />
      <br />
      <br />
      <br />
      <div style={{ width: "80%", marginLeft: "10%" }}>
        <Table
          css={{ minWidth: "100%", height: "calc($space$14 * 10)" }}
          selectionMode="multiple"
          aria-labelledby="Recipe Table"
        >
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column
                key={column.uid}
                hideHeader={column.uid === "actions"}
              >
                {column.name}
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body
            items={list.items}
            loadingState={list.loadingState}
            onLoadMore={list.loadMore}
          >
            {(item: RecipeType) => (
              <Table.Row key={item.name}>
                {(key) => <Table.Cell>{renderCell(item, key)}</Table.Cell>}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default Manage;
