import fs from "fs";
import path from "path";

const srcDir = path.resolve("src");

const extensions = [".js", ".jsx", ".ts", ".tsx", ".css"];

const hexPattern = /(?<!&)#[0-9a-fA-F]{3,8}\b/g;
const rgbPattern = /\b(?:rgb|rgba|hsl|hsla)\([^)]*\)/gi;

const violations = [];

function scanDirectory(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      scanDirectory(fullPath);
      continue;
    }

    if (!extensions.includes(path.extname(entry.name))) {
      continue;
    }

    scanFile(fullPath);
  }
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/);

  lines.forEach((line, index) => {
    const isTokenDefinition =
      filePath.endsWith("index.css") &&
      line.trim().startsWith("--aairo-");

    if (isTokenDefinition) {
      return;
    }

    const cleanLine = line.replace(/var\(--aairo-[^)]+\)/g, "");

    const matches = [
      ...(cleanLine.match(hexPattern) || []),
      ...(cleanLine.match(rgbPattern) || [])
    ];

    if (matches.length > 0) {
      violations.push({
        file: path.relative(process.cwd(), filePath),
        line: index + 1,
        values: [...new Set(matches)]
      });
    }
  });
}

scanDirectory(srcDir);

if (violations.length === 0) {
  console.log("No hardcoded colours found.");
  process.exit(0);
}

console.log("Hardcoded colours found:\n");

for (const violation of violations) {
  console.log(
    `${violation.file}:${violation.line} -> ${violation.values.join(", ")}`
  );
}

console.log(`\nFound ${violations.length} line(s) with hardcoded colours.`);

process.exit(1);