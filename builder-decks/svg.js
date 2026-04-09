

import Builder from "taleem-builder";

export default function build() {
  const b = new Builder();

  b.meta({ name: "test-deck" });

  b.background()
    .color("#111111")
    .image(null)
    .opacity(0.3);

  b.at(0)
    .fillImage()
    .image("content/images/spaced-repetition-study-method.svg", 0);

  b.end(10);

  return b.build();
}
