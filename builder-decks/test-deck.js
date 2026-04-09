import Builder from "taleem-builder";

export default function build() {
  const b = new Builder();

  b.meta({ name: "test-deck" });

  b.background()
    .color("#111111")
    .image(null)
    .opacity(0.3);

  b.at(0)
    .titleAndSubtitle()
    .title("Title Here", 0)
    .subtitle("Subtitle here", 2);

  b.end(10);

  return b.build();
}
