import { Effect } from "effect"
import { effectCmd } from "../effect-cmd"
import { TIPS, INPUT_UNDO_TIP, TERMINAL_SUSPEND_TIP, type Shortcuts } from "@opencode-ai/core/tips"

type Binding = { key: string }
type BindingLookupView = { get(command: string): readonly Binding[] }

const COMMAND_NAMES: Record<keyof Shortcuts, string> = {
  agentCycle: "agent.cycle",
  childFirst: "session.child.first",
  childNext: "session.child.next",
  childPrevious: "session.child.previous",
  commandList: "command.palette.show",
  editorOpen: "prompt.editor",
  helpShow: "help.show",
  inputClear: "prompt.clear",
  inputNewline: "input.newline",
  inputPaste: "prompt.paste",
  inputUndo: "input.undo",
  leader: "leader",
  messagesCopy: "messages.copy",
  messagesFirst: "session.first",
  messagesLast: "session.last",
  messagesPageDown: "session.page.down",
  messagesPageUp: "session.page.up",
  messagesToggleConceal: "session.toggle.conceal",
  modelCycleRecent: "model.cycle_recent",
  modelList: "model.list",
  sessionExport: "session.export",
  sessionInterrupt: "session.interrupt",
  sessionList: "session.list",
  sessionNew: "session.new",
  sessionParent: "session.parent",
  sessionPinToggle: "session.pin.toggle",
  sessionQuickSwitch1: "session.quick_switch.1",
  sessionQuickSwitch9: "session.quick_switch.9",
  sessionSidebarToggle: "session.sidebar.toggle",
  sessionTimeline: "session.timeline",
  statusView: "opencode.status",
  terminalSuspend: "terminal.suspend",
  themeList: "theme.switch",
}

function resolveShortcut(keybinds: BindingLookupView, commandName: string, leaderKey: string): string {
  const bindings = keybinds.get(commandName)
  if (!bindings || bindings.length === 0) return ""
  return bindings
    .map((b) => b.key.replace(/<leader>/g, `${leaderKey} `).trim())
    .join(", ")
}

export const TipsCommand = effectCmd({
  command: "tips",
  describe: "list all tips as JSON",
  instance: false,
  handler: Effect.fn("Cli.tips")(function* (_args) {
    const { TuiConfig } = yield* Effect.promise(() => import("@/config/tui"))
    const tuiConfig = yield* Effect.promise(() => TuiConfig.get().catch(() => undefined))
    const keybinds = tuiConfig?.keybinds as BindingLookupView | undefined

    const leaderKey = keybinds ? (resolveShortcut(keybinds, "leader", "") || "ctrl+x") : ""
    const shortcuts: Shortcuts = {
      agentCycle: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.agentCycle, leaderKey) : "",
      childFirst: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.childFirst, leaderKey) : "",
      childNext: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.childNext, leaderKey) : "",
      childPrevious: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.childPrevious, leaderKey) : "",
      commandList: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.commandList, leaderKey) : "",
      editorOpen: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.editorOpen, leaderKey) : "",
      helpShow: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.helpShow, leaderKey) : "",
      inputClear: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.inputClear, leaderKey) : "",
      inputNewline: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.inputNewline, leaderKey) : "",
      inputPaste: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.inputPaste, leaderKey) : "",
      inputUndo: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.inputUndo, leaderKey) : "",
      leader: () => leaderKey,
      messagesCopy: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.messagesCopy, leaderKey) : "",
      messagesFirst: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.messagesFirst, leaderKey) : "",
      messagesLast: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.messagesLast, leaderKey) : "",
      messagesPageDown: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.messagesPageDown, leaderKey) : "",
      messagesPageUp: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.messagesPageUp, leaderKey) : "",
      messagesToggleConceal: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.messagesToggleConceal, leaderKey) : "",
      modelCycleRecent: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.modelCycleRecent, leaderKey) : "",
      modelList: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.modelList, leaderKey) : "",
      sessionExport: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.sessionExport, leaderKey) : "",
      sessionInterrupt: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.sessionInterrupt, leaderKey) : "",
      sessionList: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.sessionList, leaderKey) : "",
      sessionNew: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.sessionNew, leaderKey) : "",
      sessionParent: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.sessionParent, leaderKey) : "",
      sessionPinToggle: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.sessionPinToggle, leaderKey) : "",
      sessionQuickSwitch1: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.sessionQuickSwitch1, leaderKey) : "",
      sessionQuickSwitch9: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.sessionQuickSwitch9, leaderKey) : "",
      sessionSidebarToggle: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.sessionSidebarToggle, leaderKey) : "",
      sessionTimeline: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.sessionTimeline, leaderKey) : "",
      statusView: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.statusView, leaderKey) : "",
      terminalSuspend: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.terminalSuspend, leaderKey) : "",
      themeList: () => keybinds ? resolveShortcut(keybinds, COMMAND_NAMES.themeList, leaderKey) : "",
    }

    const tips = [...TIPS, process.platform !== "win32" ? TERMINAL_SUSPEND_TIP : INPUT_UNDO_TIP].flatMap((item) => {
      const value = typeof item === "string" ? item : item(shortcuts)
      return value ? [value] : []
    })
    process.stdout.write(JSON.stringify(tips, null, 2))
    process.stdout.write("\n")
  }),
})
