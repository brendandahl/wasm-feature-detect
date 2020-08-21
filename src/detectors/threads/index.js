/**
 * Copyright 2019 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export default async moduleBytes => {
  try {
    const MessageChannelConstructor = await import("worker_threads")
      .then(m => m.MessageChannel)
      .catch(() => MessageChannel);
    // Test for transferability of SABs (needed for Firefox)
    // https://groups.google.com/forum/#!msg/mozilla.dev.platform/IHkBZlHETpA/dwsMNchWEQAJ
    new MessageChannelConstructor().port1.postMessage(new SharedArrayBuffer(1));
    return WebAssembly.validate(moduleBytes);
  } catch (e) {
    return false;
  }
};
