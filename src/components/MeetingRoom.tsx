"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./ui/resizable"
import CodeEditor from "./CodeEditor"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import EndCallButton from "./EndCallButton"
import { LayoutListIcon, LoaderIcon, UsersIcon } from "lucide-react"

function MeetingRoom() {
  const router = useRouter()
  const [layout, setLayout] = useState<"grid" | "speaker">("speaker")
  const [showParticipants, setShowParticipants] = useState(false)
  const { useCallCallingState } = useCallStateHooks()
  const callingState = useCallCallingState()

  if (callingState !== CallingState.JOINED) {
    return (
      <div className="h-96 flex items-center justify-center">
        <LoaderIcon className="size-6 animate-spin" />
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-4rem-1px)]">
      <ResizablePanelGroup orientation="horizontal">
        {/* VIDEO PANEL */}
        <ResizablePanel defaultSize={50} minSize={30} maxSize={70} className="flex flex-col relative">
          {/* Video Area */}
          <div className="flex-1 overflow-hidden">
            {layout === "grid" ? <PaginatedGridLayout /> : <SpeakerLayout />}
          </div>

          {/* Controls Area */}
          <div className="flex items-center gap-2 justify-center p-4 border-t bg-background">
            <CallControls onLeave={() => router.push("/")} />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="size-10">
                  <LayoutListIcon className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLayout("grid")}>Grid View</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLayout("speaker")}>Speaker View</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              size="icon"
              className="size-10"
              onClick={() => setShowParticipants(!showParticipants)}
            >
              <UsersIcon className="size-4" />
            </Button>

            <EndCallButton />
          </div>

          {/* Participants Overlay */}
          {showParticipants && (
            <div className="absolute right-0 top-0 h-full w-75 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 z-10">
              <CallParticipantsList onClose={() => setShowParticipants(false)} />
            </div>
          )}
        </ResizablePanel>

        {/* HANDLE */}
        <ResizableHandle withHandle />

        {/* CODE EDITOR PANEL */}
        <ResizablePanel defaultSize={50} minSize={30} maxSize={70}>
          <CodeEditor />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default MeetingRoom
