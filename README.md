> ## Documentation Index
> Fetch the complete documentation index at: [Natively](https://docs-builder.nativelyai.com/llms.txt)
> Use this file to discover all available pages before exploring further.

# Building with Speechmatics

> Use Speechmatics speech APIs in native.builder — ask the Builder agent to add real-time or batch transcription and voice features.

[Speechmatics](https://www.speechmatics.com) is a speech AI partner for **native.builder**. Their APIs turn audio into accurate text (and text back into speech) so you can add transcription, voice agents, captions, and speaker-aware features without building speech infrastructure yourself.

## What Speechmatics is

Speechmatics provides enterprise-grade **speech-to-text** and **text-to-speech** APIs built for real-world audio:

* **Real-time and batch** — Stream live audio over a WebSocket, or submit pre-recorded files for full transcripts
* **Multilingual** — Transcription across 56+ languages, with strong accent and dialect handling
* **Speaker diarization** — Label who said what in multi-speaker conversations
* **Flexible deployment** — Cloud, on-prem, or on-device when data residency matters

Typical Builder builds: meeting notes apps, call centers, accessibility captions, voice agents, and any product that needs reliable speech in the loop.

<div style={{ position: "relative", paddingTop: "59.375%" }}>
  <iframe
    src="https://customer-6158v2ccd1jgc68w.cloudflarestream.com/2503f85a87304da5b31b7800e3280f8f/iframe?poster=https%3A%2F%2Fcustomer-6158v2ccd1jgc68w.cloudflarestream.com%2F2503f85a87304da5b31b7800e3280f8f%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
    loading="lazy"
    title="Building with Speechmatics"
    style={{
  border: "none",
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
}}
    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
    allowFullScreen
  />
</div>

## Build with Speechmatics in Builder

You don’t need a special Speechmatics mode in Builder. Describe the voice or transcription feature you want, and ask the **Builder agent** to use Speechmatics.

Examples you can paste into chat:

* “Add live transcription with **Speechmatics** for uploaded meeting recordings”
* “Build a voice agent that uses **Speechmatics** for speech-to-text and text-to-speech”
* “Use **Speechmatics** diarization so each speaker gets their own transcript section”

Provide your Speechmatics API key when the agent asks (or store it as a secret in your connected backend). Builder wires the API calls, UI, and flow from your prompt.

<Tip>
  Be explicit: say **“use Speechmatics”** in the brief so the agent picks that partner instead of a generic speech library.
</Tip>

## Learn more

* [Speechmatics](https://www.speechmatics.com)
* [Speechmatics docs](https://docs.speechmatics.com)
