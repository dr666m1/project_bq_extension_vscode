import * as assert from "assert";
import * as vscode from "vscode";
import * as util from "./util";

const filename = "completion.bq";

describe("Completion", function () {
  beforeEach(async function () {
    await util.createTextDocument(filename);
  });
  afterEach(async function () {
    await util.deleteTextDocument(filename);
  });
  it("reservedKeywords", async function () {
    const sql = "S"; // NOTE Actually, any string is ok.
    await util.insert("completion.bq", new vscode.Position(0, 0), sql);
    const list = (await vscode.commands.executeCommand(
      "vscode.executeCompletionItemProvider",
      util.getDocUri("completion.bq"),
      new vscode.Position(0, sql.length)
    )) as vscode.CompletionList;
    assert.ok(list.items.some((x) => x.label === "SELECT"));
  });
  it("function", async function () {
    const sql = "SELECT C";
    await util.insert("completion.bq", new vscode.Position(0, 0), sql);
    const list = (await vscode.commands.executeCommand(
      "vscode.executeCompletionItemProvider",
      util.getDocUri("completion.bq"),
      new vscode.Position(0, sql.length)
    )) as vscode.CompletionList;
    assert.ok(list.items.some((x) => x.label === "CURRENT_TIMESTAMP"));
  });
  it("project", async function () {
    const sql = "SELECT * FROM `";
    await util.insert("completion.bq", new vscode.Position(0, 0), sql);
    const list = (await vscode.commands.executeCommand(
      "vscode.executeCompletionItemProvider",
      util.getDocUri("completion.bq"),
      new vscode.Position(0, sql.length)
    )) as vscode.CompletionList;
    assert.ok(list.items.some((x) => x.label === util.project));
  });
  it("dataset", async function () {
    const sql = `SELECT * FROM \`${util.project}.\``;
    await util.insert("completion.bq", new vscode.Position(0, 0), sql);
    const list = (await vscode.commands.executeCommand(
      "vscode.executeCompletionItemProvider",
      util.getDocUri("completion.bq"),
      new vscode.Position(0, sql.length - 1)
    )) as vscode.CompletionList;
    assert.ok(list.items.some((x) => x.label === "bq_extension_vscode_test"));
  });
  it("table_name", async function () {
    const sql = `SELECT * FROM \`${util.project}.bq_extension_vscode_test.\``;
    await util.insert("completion.bq", new vscode.Position(0, 0), sql);
    const list = (await vscode.commands.executeCommand(
      "vscode.executeCompletionItemProvider",
      util.getDocUri("completion.bq"),
      new vscode.Position(0, sql.length - 1)
    )) as vscode.CompletionList;
    assert.ok(list.items.some((x) => x.label === "t"));
  });
});
