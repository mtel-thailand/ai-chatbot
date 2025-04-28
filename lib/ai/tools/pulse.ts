import { tool } from "ai";
import { z } from "zod";

const MOCK_DATA = {
  projects: [
    {
      id: "1",
      name: "Pulse",
      description: "Description of Pulse",
      status: "active",
    },
    {
      id: "2",
      name: "One Bangkok",
      description: "Description of One Bangkok",
      status: "active",
    },
  ],
  members: [
    {
      id: "1",
      name: "John Doe",
    },
    {
      id: "2",
      name: "Jane Smith",
    },
  ],
  work_logs: [],
};

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

// Helper to generate random hours worked
function randomHours() {
  return Math.floor(Math.random() * 8) + 1; // 1 to 8 hours
}

// Generate 50 random work logs
for (let i = 0; i < 50; i++) {
  const project =
    MOCK_DATA.projects[Math.floor(Math.random() * MOCK_DATA.projects.length)];
  const member =
    MOCK_DATA.members[Math.floor(Math.random() * MOCK_DATA.members.length)];
  const date = randomDate(new Date("2024-03-01"), new Date("2024-04-30"));

  MOCK_DATA.work_logs.push({
    id: (i + 1).toString(),
    projectId: project.id,
    memberId: member.id,
    date: date.toISOString().split("T")[0], // Format: YYYY-MM-DD
    hoursWorked: randomHours(),
    description: `Worked on ${project.name} by ${member.name}`,
  } as never);
}

export const getProjects = tool({
  description: "Get a list of projects",
  parameters: z.object({
    name: z.string().optional(),
  }),
  execute: async () => {
    return MOCK_DATA.projects;
  },
});

export const getMembers = tool({
  description: "Get a list of members",
  parameters: z.object({
    name: z.string().optional(),
  }),
  execute: async () => {
    return MOCK_DATA.members;
  },
});

export const getWorkLogs = tool({
  description: "Get a list of work logs by project name and or member name",
  parameters: z.object({
    projectName: z.string().optional(),
    memberName: z.string().optional(),
  }),
  execute: async ({ projectName, memberName }) => {
    let workingLogs = MOCK_DATA.work_logs;

    if (projectName) {
      const projectId = MOCK_DATA.projects.find(
        (project) => project.name === projectName
      )?.id;
      workingLogs = workingLogs.filter((log) => log.projectId === projectId);
    }

    if (memberName) {
      const memberId = MOCK_DATA.members.find(
        (member) => member.name === memberName
      )?.id;
      workingLogs = workingLogs.filter((log) => log.memberId === memberId);
    }
    return workingLogs;
  },
});
