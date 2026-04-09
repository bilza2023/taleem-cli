import Builder from "taleem-builder";

export default function build() {
  const b = new Builder();

  b.meta({ name: "test-deck" });

  b.background()
    .color("#111111")
    .image("content/images/bg.webp")
    .opacity(0.3);
 ///////////////////////////////////////////   
    b.at(0)
    .titleAndSubtitle()
    .title("Three Famous Study Systems", 0)
    .subtitle("Simple methods to study better and remember more", 2);

    b.at(6)
    .titleAndPara()
    .title("Studying feels hard sometimes", 6)
    .para("You read again and again, but nothing sticks. It feels frustrating and slow.", 8);

    b.at(12)
  .titleAndSubtitle()
  .title("Active Recall", 12)
  .subtitle("Don’t just read — test yourself", 14);

  b.at(18)
  .imageLeftBulletsRight()
  .image("content/images/box.webp", 18)
  .bullet("Close your book", 20)
  .bullet("Try to remember the answer", 22)
  .bullet("Check what you missed", 24)
  .bullet("Repeat until it sticks", 26);

  b.at(26)
  .imageRightBulletsLeft()
  .image("content/images/box.webp", 26)
  .bullet("For exam preparation", 28)
  .bullet("Builds strong memory", 30)
  .bullet("Finds weak areas fast", 32)
  .bullet("Stops passive reading", 34);


///////////////////////
b.at(34)
  .titleAndSubtitle()
  .title("Spaced Repetition", 34)
  .subtitle("Review at the right time", 36);

b.at(40)
  .imageLeftBulletsRight()
  .image("content/images/spaced-repetition-study-method.svg", 40)
  .bullet("Study today", 42)
  .bullet("Review after a short gap", 44)
  .bullet("Increase the gap each time", 46)
  .bullet("Don’t cram everything at once", 48);

b.at(48)
  .imageRightBulletsLeft()
  .image("content/images/box.webp", 48)
  .bullet("Best for long-term memory", 50)
  .bullet("Prevents forgetting", 52)
  .bullet("Reduces last-minute stress", 54)
  .bullet("Saves time over time", 56);

///////////////////////
b.at(56)
  .titleAndSubtitle()
  .title("Pomodoro Technique", 56)
  .subtitle("Study in short focused sessions", 58);

b.at(62)
  .imageLeftBulletsRight()
  .image("content/images/box.webp", 62)
  .bullet("Study for 25 minutes", 64)
  .bullet("Take a 5 minute break", 66)
  .bullet("Repeat 4 times", 68)
  .bullet("Take a longer break", 70);

b.at(70)
  .imageRightBulletsLeft()
  .image("content/images/box.webp", 70)
  .bullet("Improves focus", 72)
  .bullet("Prevents burnout", 74)
  .bullet("Keeps study sessions short", 76)
  .bullet("Easy to follow daily", 78);

b.at(78)
  .titleAndPara()
  .title("Start simple", 78)
  .para("You don’t need to study longer. You need to study smarter. Try one technique today and see the difference.", 80);
///////////////////////
  b.end(90);

  return b.build();
}
