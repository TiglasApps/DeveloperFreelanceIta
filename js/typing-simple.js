// Typing Animation with syntax highlighting
class TypingAnimation {
  constructor(elementId, codeLines) {
    this.element = document.getElementById(elementId);
    this.codeLines = codeLines;
    this.currentLine = 0;
    this.currentChar = 0;
    this.isTyping = false;
    this.typingSpeed = 30;
    this.pauseSpeed = 2000;
    this.init();
  }

  init() {
    this.startTyping();
  }

  startTyping() {
    if (this.isTyping) return;
    this.isTyping = true;
    this.type();
  }

  type() {
    if (this.currentLine >= this.codeLines.length) {
      this.currentLine = 0;
      this.currentChar = 0;
      this.element.innerHTML = '';
      setTimeout(() => this.type(), this.pauseSpeed);
      return;
    }

    const currentLine = this.codeLines[this.currentLine];
    
    if (this.currentChar < currentLine.length) {
      // Estrai solo il testo visibile per il conteggio dei caratteri
      const plainText = currentLine.replace(/<[^>]*>/g, '');
      
      // Ricostruisci l'HTML mantenendo i tag completi
      let htmlOutput = '';
      let charIndex = 0;
      let tempHtml = currentLine;
      let targetCharIndex = this.currentChar + 1;
      
      while (tempHtml.length > 0 && charIndex < targetCharIndex) {
        if (tempHtml.startsWith('<')) {
          const tagEnd = tempHtml.indexOf('>');
          if (tagEnd !== -1) {
            htmlOutput += tempHtml.substring(0, tagEnd + 1);
            tempHtml = tempHtml.substring(tagEnd + 1);
          } else {
            break;
          }
        } else {
          htmlOutput += tempHtml[0];
          tempHtml = tempHtml.substring(1);
          charIndex++;
        }
      }
      
      this.element.innerHTML = htmlOutput;
      this.currentChar++;
      setTimeout(() => this.type(), this.typingSpeed);
    } else {
      // Mostra il codice completo per un po' prima di passare al successivo
      this.element.innerHTML = currentLine;
      setTimeout(() => {
        this.currentLine++;
        this.currentChar = 0;
        this.element.innerHTML = '';
        this.type();
      }, this.pauseSpeed);
    }
  }
}

// Code snippets to display with syntax highlighting
const codeSnippets = [
  `<span class="keyword">const</span> <span class="variable">fullStackDev</span>: <span class="type">Developer</span> = <span class="bracket">{</span>
  <span class="variable">skills</span>: <span class="bracket">[</span><span class="string">'React'</span>, <span class="string">'Node.js'</span>, <span class="string">'TypeScript'</span><span class="bracket">]</span>,
  <span class="variable">passion</span>: <span class="string">'Building amazing apps'</span>,
  <span class="variable">status</span>: <span class="string">'Always learning'</span>
<span class="bracket">}</span>;`,
  `<span class="keyword">async function</span> <span class="function">createSomethingAwesome</span><span class="bracket">(</span><span class="bracket">)</span>: <span class="type">Promise</span><span class="bracket"><</span><span class="type">string</span><span class="bracket">></span> <span class="bracket">{</span>
  <span class="keyword">const</span> <span class="variable">ideas</span> = <span class="await">await</span> <span class="function">gatherInspiration</span><span class="bracket">(</span><span class="bracket">)</span>;
  <span class="keyword">const</span> <span class="variable">code</span> = <span class="await">await</span> <span class="function">implement</span><span class="bracket">(</span><span class="variable">ideas</span><span class="bracket">)</span>;
  <span class="keyword">return</span> <span class="await">await</span> <span class="function">deployToProduction</span><span class="bracket">(</span><span class="variable">code</span><span class="bracket">)</span>;
<span class="bracket">}</span>`,
  `<span class="keyword">class</span> <span class="function">Developer</span> <span class="bracket">{</span>
  <span class="modifier">private</span> <span class="variable">name</span>: <span class="type">string</span>;
  <span class="modifier">private</span> <span class="variable">skills</span>: <span class="type">string</span><span class="bracket">[</span><span class="bracket">]</span> = <span class="bracket">[</span><span class="bracket">]</span>;
  <span class="modifier">private</span> <span class="variable">projects</span>: <span class="type">Project</span><span class="bracket">[</span><span class="bracket">]</span> = <span class="bracket">[</span><span class="bracket">]</span>;
  
  <span class="function">constructor</span><span class="bracket">(</span><span class="variable">name</span>: <span class="type">string</span><span class="bracket">)</span> <span class="bracket">{</span>
    <span class="keyword">this</span>.<span class="variable">name</span> = <span class="variable">name</span>;
  <span class="bracket">}</span>
  
  <span class="modifier">public</span> <span class="function">learn</span><span class="bracket">(</span><span class="variable">skill</span>: <span class="type">string</span><span class="bracket">)</span>: <span class="type">void</span> <span class="bracket">{</span>
    <span class="keyword">this</span>.<span class="variable">skills</span>.<span class="function">push</span><span class="bracket">(</span><span class="variable">skill</span><span class="bracket">)</span>;
  <span class="bracket">}</span>
<span class="bracket">}</span>`,
  `<span class="keyword">interface</span> <span class="type">Portfolio</span> <span class="bracket">{</span>
  <span class="variable">frontend</span>: <span class="type">string</span><span class="bracket">[</span><span class="bracket">]</span>;
  <span class="variable">backend</span>: <span class="type">string</span><span class="bracket">[</span><span class="bracket">]</span>;
  <span class="variable">database</span>: <span class="type">string</span><span class="bracket">[</span><span class="bracket">]</span>;
  <span class="variable">cloud</span>: <span class="type">string</span><span class="bracket">[</span><span class="bracket">]</span>;
<span class="bracket">}</span>

<span class="keyword">const</span> <span class="variable">portfolio</span>: <span class="type">Portfolio</span> = <span class="bracket">{</span>
  <span class="variable">frontend</span>: <span class="bracket">[</span><span class="string">'React'</span>, <span class="string">'Vue'</span>, <span class="string">'Angular'</span><span class="bracket">]</span>,
  <span class="variable">backend</span>: <span class="bracket">[</span><span class="string">'Node.js'</span>, <span class="string">'Python'</span>, <span class="string">'Java'</span><span class="bracket">]</span>,
  <span class="variable">database</span>: <span class="bracket">[</span><span class="string">'PostgreSQL'</span>, <span class="string">'MongoDB'</span><span class="bracket">]</span>,
  <span class="variable">cloud</span>: <span class="bracket">[</span><span class="string">'AWS'</span>, <span class="string">'Docker'</span>, <span class="string">'K8s'</span><span class="bracket">]</span>
<span class="bracket">}</span>;`
];

// Initialize typing animation
const typingAnimation = new TypingAnimation('typing-code', codeSnippets);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TypingAnimation;
}
