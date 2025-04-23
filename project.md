Neo_Cut – AI-Powered Conversational Video Editor

Neo_Cut is a modified fork of LosslessCut, designed to become the first local, AI-powered text-based video editing assistant. The long-term vision is to let users edit or generate videos by simply chatting with an AI, eliminating complex timelines or manual slicing.

Project Overview:

Neo_Cut aims to:

Enable natural language editing via chat (e.g. “Cut out 1:10–1:45 and extract audio”)
Execute edits using FFmpeg, powered by LosslessCut’s fast lossless export system
Run entirely offline and locally, preserving user privacy and ensuring performance
Eventually understand video content, enabling context-aware editing (e.g. “remove scenes where the speaker is off-camera”)
This project focuses on Phase 1 – the MVP – which adds a chat interface and LLM prompt parsing to LosslessCut.

Current Repository Goals:

This is a development fork of LosslessCut. We are:

Keeping most of LosslessCut’s video editing capabilities untouched
Injecting a new Chat UI into the frontend (React, in renderer/src)
Connecting that UI to a local LLM backend (e.g. Flask + GPT or local model)
Translating natural language into FFmpeg command-line operations
Displaying or logging the resulting command for now – future steps will apply it directly
Functional Example:

User input: "Cut from 2:10 to 2:45 and extract audio"

LLM output: ffmpeg -i input.mp4 -ss 00:02:10 -to 00:02:45 -vn -acodec copy audio.mp3

Goal: Display this command now, and eventually inject it into LosslessCut’s editing logic

Key File Locations:

renderer/src/components/ChatBox.tsx – React component for chat UI
renderer/src/App.tsx – Entry point that mounts the chat and handles responses
src/main/ffmpeg.ts – Where FFmpeg commands are executed (potential injection point)
src/renderer/src/hooks/useFfmpegOperations.ts – Possible place to hook in AI-generated edits
llm_server.py – Python/Flask backend that receives prompts and returns FFmpeg commands

Tasks and TODOs:

Phase 1 – MVP: Chat-Controlled Editing [x] Fork and run LosslessCut locally
[x] Add chatbox UI to React frontend
[x] Connect chat to local Flask server (POST /query)
[x] Parse input and return valid FFmpeg commands
[ ] Integrate FFmpeg commands into LosslessCut’s core logic
[ ] Allow preview/edit validation before executing
[ ] Log past commands and allow undo via chat

Future Phases (not in this repo yet):

Semantic scene understanding via CV/LLM fusion
Contextual queries (e.g. “cut scenes with low light”)
Voice-based prompts (using Whisper or similar)
Full end-to-end generation using text-to-video models
Notes for LLM Agents:

This repo expects a language model or AI agent to:

Translate editing prompts into FFmpeg CLI operations
Return clean, lossless-compatible commands (e.g. using -ss, -to, -c copy)
Eventually support multistep conversational workflows (e.g. “undo that last change”)
Do not attempt manual timeline-based edits. This project follows an instruction-to-command-to-execution pipeline.

Local Dev Quickstart:

Terminal 1: yarn install
yarn dev

Terminal 2 (in same or sibling directory): python llm_server.py

Authors and Credits:

Original LosslessCut by mifi
Neo_Cut AI integration by Neo_Cut Team – https://github.com/byrencheema

License and Usage:

This fork is MIT licensed like LosslessCut, but is intended for AI video editing research and prototyping only in this early stage.

Final Notes:

The chat UI is the first step toward a new kind of editing interface – one that talks back, understands context, and helps users create faster and smarter. Neo_Cut will bring editing into the conversational era.

Let’s build it.