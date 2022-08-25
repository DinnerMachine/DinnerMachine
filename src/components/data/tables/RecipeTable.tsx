import { ActionIcon, Checkbox, Group, Table } from "@mantine/core";
import { RecipeUser } from "../../../api/Recipe/Recipe";
import { IconTrash, IconPencil } from "@tabler/icons";
import React from "react";

function RecipeTable({ recipes }: { recipes: RecipeUser[] }) {
    const [selection, setSelection] = React.useState<string[]>([]);
    const toggleRow = (id: string) =>
        setSelection((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id]
        );
    const toggleAll = () =>
        setSelection((current) =>
            current.length === recipes.length
                ? []
                : recipes.map((item) => item.getName())
        );

    const rows = recipes.map((recipe) => {
        return (
            <tr key={recipe.getName()}>
                <td>
                    <Checkbox
                        checked={selection.includes(recipe.getName())}
                        onChange={() => toggleRow(recipe.getName())}
                    />
                </td>
                <td>{recipe.getName()}</td>
                <td>{recipe.getLastDate().toDateString()}</td>
                <td>15</td>
                <td>5</td>
                <td>
                    <Group spacing={0} position="right">
                        <ActionIcon color="success">
                            <IconPencil size={16} stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon color="danger">
                            <IconTrash size={16} stroke={1.5} />
                        </ActionIcon>
                    </Group>
                </td>
            </tr>
        );
    });
    return (
        <Table sx={{ minWidth: 800 }}>
            <thead>
                <tr>
                    <th style={{ width: 40 }}>
                        <Checkbox
                            onChange={toggleAll}
                            checked={selection.length === recipes.length}
                            indeterminate={
                                selection.length > 0 &&
                                selection.length !== recipes.length
                            }
                        />
                    </th>
                    <th>Name</th>
                    <th>Last Date</th>
                    <th>Time to Cook</th>
                    <th>Rating</th>
                    <th />
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
}

export default RecipeTable;
