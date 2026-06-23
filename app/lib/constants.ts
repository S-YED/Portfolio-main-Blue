import {
  SkillsCategorised,
  botProjectDataTypes,
  projectDataType,
  AchievementsDataType,
} from "@/app/lib/definitions";
import { createElement, SVGProps } from "react";

import jsSvg from "@/public/assets/svg/javascript.svg";
import tsSvg from "@/public/assets/svg/typescript.svg";
import reactSvg from "@/public/assets/svg/react-js.svg";
import {
  SiNextdotjs,
  SiSelenium,
  SiPostman,
  SiJira,
  SiVercel,
  SiPostgresql,
  SiMysql,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import tailwindSvg from "@/public/assets/svg/tailwind-css.svg";
import mongodbSvg from "@/public/assets/svg/mongodb.svg";
import sqlSvg from "@/public/assets/svg/my-sql.svg";
import gitSvg from "@/public/assets/svg/git.svg";
import dockerSvg from "@/public/assets/svg/docker.svg";
import gcpSvg from "@/public/assets/svg/google-cloud.svg";
import awslambdaSvg from "@/public/assets/svg/awslambda.svg";
import pythonSvg from "@/public/assets/svg/python.svg";

// Real product screenshots (public/assets/projects/screenshots/) for the
// shipped projects; branded SVG cover art (public/assets/projects/covers/)
// for the remaining ones that don't have a captured screenshot yet.
const covers = {
  qaForge: "/assets/projects/screenshots/qa-forge.png",
  cloudPortfolio: "/assets/projects/screenshots/cloud-portfolio.png",
  gecrStore: "/assets/projects/screenshots/gecr-store.png",
  embellDecor: "/assets/projects/screenshots/embell-decor.png",
  visageHealth: "/assets/projects/covers/visage-health.svg",
  lambdaApp: "/assets/projects/covers/lambda-app.svg",
};

// ---------------- Skills ---------------------------

const PlaywrightIcon = (props: SVGProps<SVGSVGElement>) =>
  createElement(
    "svg",
    {
      viewBox: "0 0 48 48",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
    },
    createElement("path", {
      d: "M10.5 16.5c2.6-2.5 7.4-3 11.5-1.4v17.8c-4.1 1.6-8.9 1.1-11.5-1.4-4.1-3.9-4.1-11.1 0-15Z",
      fill: "currentColor",
      opacity: 0.75,
    }),
    createElement("path", {
      d: "M26 15.1c4.1-1.6 8.9-1.1 11.5 1.4 4.1 3.9 4.1 11.1 0 15-2.6 2.5-7.4 3-11.5 1.4V15.1Z",
      fill: "currentColor",
      opacity: 0.45,
    }),
    createElement("path", {
      d: "M14 23.2c1.8 1.2 3.8 1.2 5.6 0M28.4 23.2c1.8 1.2 3.8 1.2 5.6 0M15.2 29.2c1.2 1.3 3.2 1.3 4.4 0M29.1 29.2c1.2 1.3 3.2 1.3 4.4 0",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
    })
  );

const BrowserStackIcon = (props: SVGProps<SVGSVGElement>) =>
  createElement(
    "svg",
    {
      viewBox: "0 0 48 48",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...props,
    },
    createElement("rect", {
      x: 12,
      y: 8,
      width: 28,
      height: 28,
      rx: 7,
      fill: "currentColor",
      opacity: 0.35,
    }),
    createElement("rect", {
      x: 8,
      y: 12,
      width: 28,
      height: 28,
      rx: 7,
      fill: "currentColor",
      opacity: 0.7,
    }),
    createElement("path", {
      d: "M18 19.5h7.2c2.4 0 4 1.3 4 3.3 0 1.3-.7 2.4-1.9 2.9 1.5.4 2.5 1.6 2.5 3.3 0 2.2-1.7 3.5-4.4 3.5H18v-13Zm6.6 5.2c1 0 1.6-.5 1.6-1.3s-.6-1.3-1.6-1.3h-3.4v2.6h3.4Zm.4 5.2c1.1 0 1.7-.5 1.7-1.4s-.6-1.4-1.8-1.4h-3.7v2.8H25Z",
      fill: "currentColor",
    })
  );

export const skills: SkillsCategorised[] = [
  {
    category: "Languages & Programming",
    skills: [
      { name: "Java", icon: FaJava },
      { name: "JavaScript", icon: jsSvg },
      { name: "SQL", icon: sqlSvg },
      { name: "Python (basic)", icon: pythonSvg },
    ],
  },
  {
    category: "Testing & Quality",
    skills: [
      { name: "Selenium", icon: SiSelenium },
      { name: "Playwright", icon: PlaywrightIcon },
      { name: "Postman", icon: SiPostman },
      { name: "JIRA", icon: SiJira },
      { name: "BrowserStack", icon: BrowserStackIcon },
    ],
  },
  {
    category: "Cloud, DevOps & Infrastructure",
    skills: [
      { name: "AWS (S3, CloudFront, ACM, WAF)", icon: awslambdaSvg },
      { name: "GCP (Production)", icon: gcpSvg },
      { name: "Docker (basic)", icon: dockerSvg },
      { name: "Vercel", icon: SiVercel },
      { name: "Git", icon: gitSvg },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "MySQL", icon: SiMysql },
      { name: "MongoDB", icon: mongodbSvg },
      { name: "PostgreSQL", icon: SiPostgresql },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "React", icon: reactSvg },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: tailwindSvg },
      { name: "TypeScript", icon: tsSvg },
    ],
  },
];

// -------------------------------------------------------
// ---------------- Projects ---------------------------

export const projectData: projectDataType[] = [
  {
    name: "QA Forge",
    description:
      "AI-powered automated testing platform with CI/CD pipeline integration. Automates test case generation, coverage analysis, and regression path suggestions. MVP 1 shipped; MVP 2 in progress.",
    image: covers.qaForge,
    techStack: ["AI", "CI/CD", "Test Automation", "Next.js", "TypeScript"],
    github: "https://qa-forge-gamma.vercel.app/landing",
    date: new Date("2026-04-01"),
  },
  {
    name: "Cloud-Hosted Portfolio",
    description:
      "Production-style AWS static website architecture: S3 for hosting, CloudFront CDN, ACM SSL/TLS, WAF for security, Route 53 DNS, and billing alarms. Resolved real WAF misconfiguration issues.",
    image: covers.cloudPortfolio,
    techStack: ["AWS S3", "CloudFront", "ACM", "WAF", "Route 53", "DNS"],
    github: "https://github.com/S-YED/Portfolio-main-Blue",
    deployedLink: "https://syedkm.com",
    date: new Date("2026-01-01"),
  },
  {
    name: "GECR Store",
    description:
      "Full-stack web inventory management system at Government Engineering College Ramanagara. Replaced a manual ledger, reducing management time by ~70%. React frontend, MySQL backend, admin dashboard.",
    image: covers.gecrStore,
    techStack: ["React", "MySQL", "Authentication", "Admin Dashboard"],
    github: "https://github.com/S-YED/GECR-STORE",
    date: new Date("2024-09-01"),
  },
  {
    name: "Embell Decor",
    description:
      "Production business portfolio website designed and delivered for a real client. Currently live and maintained at embelldecor.com. Clean, modern design with full service showcase.",
    image: covers.embellDecor,
    techStack: ["Web Design", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/S-YED",
    deployedLink: "https://embelldecor.com",
    date: new Date("2025-12-01"),
  },
  {
    name: "Visage Health",
    description:
      "AI-powered facial health analyzer app using Google Gemini API. Analyses facial photos to detect skin indicators and delivers personalised daily skincare suggestions with live demo.",
    image: covers.visageHealth,
    techStack: ["Google Gemini API", "Firebase", "FlutterFlow", "AI"],
    github: "https://github.com/S-YED/Visage-Health",
    date: new Date("2024-06-01"),
  },
  {
    name: "Serverless Lambda App",
    description:
      "Python serverless application deployed on AWS Lambda with S3 integration using StackGen Infrastructure-as-Code at DevInfraGuruDays. Real-world serverless deployment patterns.",
    image: covers.lambdaApp,
    techStack: ["Python", "AWS Lambda", "S3", "StackGen IaC", "Serverless"],
    github: "https://github.com/S-YED/hello-kitty",
    date: new Date("2024-10-01"),
  },
];

export const botProjectData: botProjectDataTypes[] = [
  {
    name: "TON Scholar DApp",
    link: "https://github.com/S-YED",
  },
  {
    name: "Open Source Contributions",
    link: "https://github.com/S-YED",
  },
];

// -------------------------------------------------------
// ---------------- Achievements ---------------------------

export const achievementsData: AchievementsDataType[] = [
  {
    name: "Keploy API Fellowship",
    description:
      "Selected from 18,500+ global applicants - only 1,000 chosen worldwide for this competitive API testing fellowship.",
    date: "2025",
  },
  {
    name: "Oracle Cloud Infrastructure Certified",
    description:
      "Earned OCI 2025 Foundations Associate (1Z0-1085-25) certification - Oracle's professional cloud credential.",
    date: "Oct 2025",
  },
  {
    name: "HPAIR Asia Conference 2025",
    description:
      "Selected for the Harvard Project for Asian and International Relations Conference, hosted at University of Tokyo, Japan.",
    date: "2025",
  },
  {
    name: "Headstarter AI SWE Fellowship",
    description:
      "Accepted into the Headstarter AI Software Engineering Fellowship for hands-on AI development experience.",
    date: "2025",
  },
  {
    name: "TON Blockchain Hackathon Prize",
    description:
      "Won challenge prize (smartwatch) at TON Blockchain Bangalore Bootcamp Hackathon; built TON Scholar DApp with team BitBusters.",
    date: "2025",
  },
  {
    name: "Hacktoberfest 2024 Contributor",
    description:
      "Successfully merged pull requests during Hacktoberfest 2024, contributing to open source projects globally.",
    date: "Oct 2024",
  },
  {
    name: "Campus Ambassador - E-Cell IIT Bombay",
    description:
      "Served as Campus Ambassador for E-Cell IIT Bombay, promoting entrepreneurship and tech innovation.",
    date: "2024",
  },
];

// -------------------------------------------------------
