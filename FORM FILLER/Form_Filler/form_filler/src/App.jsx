
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Navbar,
  Button,
  Input,
  ListItemSuffix,
  Option,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Select,

} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  UserCircleIcon,
  DocumentDuplicateIcon,
  PowerIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  ShoppingBagIcon,
  Cog6ToothIcon,
  InboxIcon,
  PlusIcon
} from "@heroicons/react/24/solid";

import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";



import React from "react";



function App() {
  const [alwaysOpen] = React.useState(true);

  const TABLE_HEAD = ["Name", "Job", "Employed", ""];

  const TABLE_ROWS = [
    {
      name: "John Michael",
      job: "Manager",
      date: "23/04/18",
    },
    {
      name: "Alexa Liras",
      job: "Developer",
      date: "23/04/18",
    },
    {
      name: "Laurent Perrier",
      job: "Executive",
      date: "19/09/17",
    },
    {
      name: "Michael Levi",
      job: "Developer",
      date: "24/12/08",
    },
    {
      name: "Richard Gran",
      job: "Manager",
      date: "04/10/21",
    },
  ];

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow">
        <div className="w-fixed w-full flex-shrink flex-grow-0 px-4">
          <div className="sticky top-0 p-4 w-full h-full">
            <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
              <div className="mb-2 p-4">
                <Typography variant="h5" color="blue-gray">
                  Template Filler
                </Typography>
              </div>
              <List>
                <ListItem className="pb-6">
                  <ListItemPrefix >
                    <PresentationChartBarIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Dashboard
                </ListItem>
                <hr className="my-2 border-blue-gray-50" />
                <Accordion
                  open={alwaysOpen}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  }
                >
                  <ListItem className="p-0 mb-3" selected={open === 2}>
                    <AccordionHeader className="border-b-0 p-3">
                      <ListItemPrefix>
                        <UserCircleIcon className="h-5 w-5" />
                      </ListItemPrefix>
                      <Typography color="blue-gray" className="mr-auto font-normal">
                        User Select
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-1">

                    <Select className="p-4" color="blue" label="Select Template" >
                      <Option>KRA</Option>
                      <Option>I & M Personal ACC</Option>
                      <Option>I & M Company ACC</Option>
                      <Option>NSSF</Option>
                      <Option>NTSA</Option>
                      <Option>NHIF</Option>
                    </Select>
                    <div className="mt-5">
                      <Input icon={<MagnifyingGlassIcon className="h-5 w-5" />} label="Search" />
                    </div>
                    <Card className="m-4 p-3" color="teal">
                      <Typography variant="h5" className="mb-1">
                        USER:
                      </Typography>
                      <Typography variant="small" className="font-normal" >
                        JAMES EPALE
                      </Typography>
                    </Card>
                    <Button color="green" className="ml-32">ADD USER</Button>
                  </AccordionBody>
                </Accordion>
                <ListItem>
                  <ListItemPrefix>
                    <PowerIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Log Out
                </ListItem>
              </List>
            </Card>
          </div>
        </div>
        <main role="main" className="w-full flex-grow pt-12 px-3">
          <div className="mt-4 w-100 h-50 pb-10"><Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map(({ name, job, date }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={name}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {job}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {date}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          Edit
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card></div>
          

          <Button className="flex items-center ml-56 gap-3" color="light-blue" size="sm">
            <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
          </Button>
        </main>
        <div className="w-fixed w-full flex-shrink flex-grow-0 px-2">
          {/* <!-- fixed-width --> */}
          <div className="flex sm:flex-col px-2">

          </div>
        </div>
      </div>

    </>
  )
}

export default App
