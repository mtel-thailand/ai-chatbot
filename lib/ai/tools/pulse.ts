import {
  Member,
  member,
  Project,
  project,
  WorkLog,
  workLog,
} from "@/lib/db/schema";
import { tool } from "ai";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { z } from "zod";

// type project = {
//   id: string;
//   name: string;
//   description: string;
//   status: string;
//   targetWorkingHours?: number;
// };

// type member = {
//   id: string;
//   name: string;
// };

// type work_log = {
//   id: string;
//   projectId: string;
//   memberId: string;
//   date: string;
//   hoursWorked: number;
//   description: string;
// };

// const MOCK_DATA: {
//   projects: project[];
//   members: member[];
//   work_logs: work_log[];
// } = {
//   projects: [
//     {
//       id: "1",
//       name: "Pulse",
//       description: "Description of Pulse",
//       status: "active",
//       targetWorkingHours: 40,
//     },
//     {
//       id: "2",
//       name: "One Bangkok",
//       description: "Description of One Bangkok",
//       status: "active",
//       targetWorkingHours: 30,
//     },
//   ],
//   members: [
//     {
//       id: "1",
//       name: "John Doe",
//     },
//     {
//       id: "2",
//       name: "Jane Smith",
//     },
//   ],
//   work_logs: [
//     {
//       id: "1",
//       projectId: "1",
//       memberId: "1",
//       date: "03-10-2024",
//       hoursWorked: 6,
//       description: "Worked on Pulse by John Doe",
//     },
//     {
//       id: "2",
//       projectId: "2",
//       memberId: "1",
//       date: "07-12-2024",
//       hoursWorked: 5,
//       description: "Worked on One Bangkok by John Doe",
//     },
//     {
//       id: "3",
//       projectId: "1",
//       memberId: "2",
//       date: "09-05-2024",
//       hoursWorked: 7,
//       description: "Worked on Pulse by Jane Smith",
//     },
//     {
//       id: "4",
//       projectId: "2",
//       memberId: "2",
//       date: "12-20-2024",
//       hoursWorked: 6,
//       description: "Worked on One Bangkok by Jane Smith",
//     },
//     {
//       id: "5",
//       projectId: "1",
//       memberId: "1",
//       date: "02-10-2025",
//       hoursWorked: 8,
//       description: "Worked on Pulse by John Doe",
//     },
//     {
//       id: "6",
//       projectId: "2",
//       memberId: "1",
//       date: "03-15-2025",
//       hoursWorked: 4,
//       description: "Worked on One Bangkok by John Doe",
//     },
//     {
//       id: "7",
//       projectId: "1",
//       memberId: "2",
//       date: "03-20-2025",
//       hoursWorked: 3,
//       description: "Worked on Pulse by Jane Smith",
//     },
//     {
//       id: "8",
//       projectId: "2",
//       memberId: "2",
//       date: "04-01-2025",
//       hoursWorked: 5,
//       description: "Worked on One Bangkok by Jane Smith",
//     },
//     {
//       id: "9",
//       projectId: "1",
//       memberId: "1",
//       date: "04-10-2025",
//       hoursWorked: 7,
//       description: "Worked on Pulse by John Doe",
//     },
//     {
//       id: "10",
//       projectId: "2",
//       memberId: "2",
//       date: "04-20-2025",
//       hoursWorked: 6,
//       description: "Worked on One Bangkok by Jane Smith",
//     },
//   ],
// };

// function autoSummarize<T extends { name?: string; description?: string }>(
//   items: T[],
//   options?: { limit?: number }
// ) {
//   const limit = options?.limit ?? 5;

//   if (items.length === 0) {
//     return "No items found.";
//   }

//   if (items.length <= limit) {
//     return items;
//   }

//   const summarized = items.slice(0, limit).map((item) => {
//     const name = item.name ?? "Unnamed";
//     const description = item.description ? ` - ${item.description}` : "";
//     return `${name}${description}`;
//   });

//   return `Summary of ${items.length} items: ${summarized.join("; ")}...`;
// }

const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export const getProjects = tool({
  description: "Get a list of projects",
  parameters: z.object({
    name: z.string().optional(),
  }),
  execute: async () => {
    let projects: Project[] = [];
    try {
      projects = await db.select().from(project);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
    return projects;
  },
});

export const getMembers = tool({
  description: "Get a list of members",
  parameters: z.object({
    name: z.string().optional(),
  }),
  execute: async () => {
    // return await db.select().from(member);
    let members: Member[] = [];

    try {
      members = await db.select().from(member);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
    return members;
  },
});

export const getWorkLogs = tool({
  description: "Get a list of work logs by project name and or member name",
  parameters: z.object({
    projectName: z.string().optional(),
    memberName: z.string().optional(),
  }),
  execute: async ({ projectName, memberName }) => {
    // let workingLogs = await db.select().from(workLog);

    // if (projectName) {
    //   const projectId = MOCK_DATA.projects.find(
    //     (project) => project.name === projectName
    //   )?.id;
    //   workingLogs = workingLogs.filter((log) => log.projectId === projectId);
    // }

    // if (memberName) {
    //   const memberId = MOCK_DATA.members.find(
    //     (member) => member.name === memberName
    //   )?.id;
    //   workingLogs = workingLogs.filter((log) => log.memberId === memberId);
    // }

    // const formattedLogs = workingLogs.map((log) => ({
    //   name: `${log.hoursWorked}h on ${log.date}`,
    //   description: log.description,
    // }));

    let workingLogs: WorkLog[] = [];
    try {
      workingLogs = await db.select().from(workLog);
    } catch (error) {
      console.error("Error fetching work logs:", error);
    }

    return workingLogs;
  },
});
