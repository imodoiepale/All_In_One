import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Select,
    Option,
    Button,
} from "@material-tailwind/react";

import { supabase } from "../supabase";
import { useEffect, useState } from "react";


const Autofill = () => {
    const [data, setData] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase.from("autofill_test").select("*");

                if (error) {
                    console.error("Oops! Something went wrong:", error.message);
                } else {
                    setData(data);
                }
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleSearchClick = () => {
        // Filter data based on user input
        const filteredData = data.filter((item) => item.name.includes(userInput));

        // Display the first matching user (if any)
        setSelectedUser(filteredData.length > 0 ? filteredData[0] : null);
    };

    const FillForm = () => {
        if (!selectedUser) {
            console.error("No user selected.");
            return;
        }

        try {
            document.getElementById("name").value = selectedUser.name;
            document.getElementById("email").value = selectedUser.email;

            console.log("Form filled successfully.");
        } catch (error) {
            console.error("Error filling the form:", error);
        }
    };

    return (
        <Card className="w-96">
            <CardHeader
                variant="gradient"
                color="gray"
                className="mb-3 grid h-18 place-items-center"
            >
                <Typography variant="h3" color="white">
                    BCL Jaza
                </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-5">
                <Select color="blue" label="Website to Fill">
                    <Option>KRA</Option>
                    <Option>EFNS</Option>
                    <Option>E-citizen</Option>
                    <Option>NSSF</Option>
                    <Option>NHIF</Option>
                </Select>
                <Select color="blue" label="Form to be Filled">
                    <Option>1-SPECIAL PASS</Option>
                    <Option>2- RE-ENTRY</Option>
                    <Option>3 - DEPENDENT PASS</Option>
                    <Option>4 - STUDENT PASS</Option>
                    <Option>5- ENDORSEMENT</Option>
                    <Option>6 - FOREIGN NATIONAL CERT</Option>
                    <Option>7 - DUAL CITIZENSHIP</Option>
                    <Option>8 - VISITORS PASS (EXT)</Option>
                    <Option>9 - Category D PR</Option>
                    <Option>10 - Category B PR</Option>
                    <Option>11 - Abroad Visa - Foreigners - WEB</Option>
                    <Option>12 - AAAAA - Permit Class D - WEB</Option>
                    <Option>13 - 1116 - Permit Class G - WEB</Option>
                </Select>

                <div className="relative flex w-full gap-4 md:w-max">
                    <Input
                        type="search"
                        label="Client Name..."
                        className="pr-28 "
                        value={userInput}
                        onChange={handleInputChange}

                    />
                    <Button size="sm" className="!absolute right-1 top-1 rounded" onClick={handleSearchClick}>
                        Search
                    </Button>

                </div>

                <Card className="mt-1 w-90" color="cyan">
                    <CardBody>
                        {selectedUser ? (
                            <div key={selectedUser.id}>
                                <Typography variant="h6" color="blue-gray" className="mx-auto">
                                    SELECTED CLIENT : {selectedUser.name.toUpperCase() || selectedUser.name.toUpperCase()}
                                </Typography>
                                <p>Email: {selectedUser.email}</p>
                            </div>
                        ) : (
                            <Typography variant="h6" color="blue-gray" className="mx-auto">
                                No user selected.
                            </Typography>
                        )}
                    </CardBody>
                </Card>

            </CardBody>
            <CardFooter className="pt-0">
                <Button variant="gradient" fullWidth onClick={FillForm}>
                    Fill form
                </Button>

            </CardFooter>
        </Card>
    );
}

export default Autofill;