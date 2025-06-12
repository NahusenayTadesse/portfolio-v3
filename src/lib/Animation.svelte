<script>
  const snippets = [
    `const visitor = "Const Visitor";`,
    `function greet() {\n  return "Hi Visitor";\n}`,
	`function should(){ return "You should hire me"}`,
    `if (visitor) {\n  console.log("Welcome to my site");\n}`,
    `for(let i=0; i<10; i++) {\n  console.log("Do you need a website?");\n}`,
    `export default function() {}`,
    `console.log("Hello Potential Employer");`,
    `const sum = (a,b) => a + b;`,
  ];

  /**
	 * @type {any[]}
	 */
  let boxes = [];

  const createBox = (/** @type {number} */ id) => ({
    id,
    left: `${Math.random() * 100}%`,
    width: `${150 + Math.random() * 100}px`,
    opacity: Math.random() * 0.7 + 0.3,
    duration: `${Math.random() * 10}s`,
    snippet: snippets[Math.floor(Math.random() * snippets.length)],
    key: Math.random() // helps force re-render
  });

  // Initialize boxes
  const boxCount = 5;
  for (let i = 0; i < boxCount; i++) {
    boxes.push(createBox(i));
  }

  /**
	 * @param {number} index
	 */
  function handleAnimationEnd(index) {
    boxes[index] = createBox(boxes[index].id);
    boxes = [...boxes]; // trigger reactivity
  }
</script>

<style>
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
    font-family: 'Fira Mono', monospace;
  }

  .box {
    position: absolute;
    bottom: -120px;
    padding: 10px;
    background-color: rgba(168, 237, 234, 0.8);
    color: var(--color-secondary-700);
    border-radius: 6px;
    font-size: 0.8rem;
    white-space: pre-wrap;
    box-shadow: 0 0 5px rgba(168, 237, 234, 0.7);
    animation-name: floatUp;
    animation-timing-function: linear;
  }

  @keyframes floatUp {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-120vh);
      opacity: 0;
    }
  }
</style>

<div class="background">
  {#each boxes as box, i (box.key)}
    <div
      class="box dark:hidden block"
      style="
        left: {box.left};
        width: {box.width};
        opacity: {box.opacity};
        animation-duration: {box.duration};
      "
      on:animationend={() => handleAnimationEnd(i)}
    >
      {box.snippet}
    </div>
  {/each}
</div>
