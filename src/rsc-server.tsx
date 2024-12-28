import type { PassThrough } from "node:stream";
import { renderToPipeableStream } from "@matthamlin/react-server-dom-esm/server";
import type { ComponentType } from "react";
import { createElement } from "react";
import type { HandlerProps } from "./types";
/**
 * Transform a Node.js Stream pipe method to work with WHATWG WritableStream
 * @param {Function} pipe - The pipe method that takes a Node.js Writable
 * @returns {Function} - A function that works with WHATWG WritableStream
 */
// function transformPipe(pipe: (output: WritableStream) => void) {
//   return async (output: WritableStream) => {
//     let nodeWritable = Writable.toWeb(output);

//     // Use the pipe method with Node.js streams
//     return new Promise((resolve, reject) => {
//       try {
//         pipe(nodeWritable);
//         nodeWritable.on("finish", resolve);
//         nodeWritable.on("error", reject);
//       } catch (error) {
//         reject(error);
//       }
//     });
//   };
// }

type RenderEntryOptions = {
  Component: ComponentType<HandlerProps>;
  request: Request;
  passthrough: PassThrough;
  returnValue: any;
  moduleBase: string;
};

export async function renderEntry({
  Component,
  request,
  passthrough,
  returnValue,
  moduleBase,
}: RenderEntryOptions): Promise<void> {
  let root = createElement(Component, {
    // @TODO: Use props or use AsyncLocalStorage???
    request,
  });

  let payload = returnValue ? { root, returnValue } : root;

  let { pipe } = renderToPipeableStream(payload, moduleBase);

  pipe(passthrough);
}
