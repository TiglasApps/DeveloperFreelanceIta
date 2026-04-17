# Full Stack Developer Portfolio

Un portfolio moderno e interattivo per sviluppatori full stack con hero section complessa e tema arancio Bitcoin.

## 🚀 Caratteristiche

### Hero Section Avanzata
- **Sistema di particelle interattivo** che reagisce al mouse
- **Animazione typing** con snippet di codice reali
- **Tech stack interattivo** con effetti hover e click
- **Statistiche animate** con contatori automatici
- **Effetti parallax** su scroll
- **Grid background animato**

### Tema Bitcoin Orange
- **Colore primario**: `#f7931a` (Arancio Bitcoin)
- **Gradienti dinamici** con effetti glow
- **Transizioni fluide** tra elementi
- **Design responsive** per tutti i dispositivi

### Modalità Dark/Light
- **Theme toggle animato** con icona sole/luna
- **Persistenza tema** in localStorage
- **Transizioni smooth** tra temi
- **Supporto sistema operativo** per preferenze tema

### Componenti Modulari
- **Header** con navigazione sticky
- **Hero** con animazioni complesse
- **Theme Toggle** riutilizzabile
- **Sistema di particelle** configurabile

## 📁 Struttura del Progetto

```
codePortfolio/
├── index.html                 # Pagina principale
├── css/
│   └── style.css             # Stili globali e variabili
├── components/
│   ├── header/
│   │   └── header.css        # Stili header
│   ├── hero/
│   │   └── hero.css          # Stili hero section
│   └── theme-toggle/
│       └── theme-toggle.css  # Stili theme toggle
└── js/
    ├── main.js               # Controller principale
    ├── theme.js              # Gestione tema
    ├── hero.js               # Interazioni hero
    ├── particles.js          # Sistema particelle
    ├── typing.js             # Animazione typing
    └── stats.js              # Contatori animati
```

## 🛠 Tecnologie Utilizzate

- **HTML5** semantic markup
- **CSS3** con variabili, grid, flexbox, animazioni
- **JavaScript ES6+** con classi e moduli
- **CSS Variables** per theming
- **Intersection Observer** per animazioni scroll
- **LocalStorage** per persistenza tema
- **RequestAnimationFrame** per performance

## 🎯 Funzionalità Interattive

### Hero Section
1. **Particelle**: 50 particelle che fuggono dal mouse
2. **Code typing**: 4 snippet di codice ciclici
3. **Tech stack**: 6 tecnologie con tooltip su click
4. **Statistiche**: Contatori animati con Intersection Observer
5. **Parallax**: Effetti di profondità su scroll

### Navigazione
- **Smooth scrolling** tra sezioni
- **Header dinamico** con backdrop blur
- **Keyboard navigation** (T per tema, frecce per navigazione)
- **Mobile responsive** con hamburger menu

### Performance
- **Lazy loading** per immagini
- **Debounced scroll** events
- **GPU acceleration** con will-change
- **Optimized animations** con requestAnimationFrame

## 🎨 Personalizzazione

### Colori Tema
Modifica le variabili CSS in `css/style.css`:

```css
:root {
  --bitcoin-orange: #f7931a;        /* Colore primario */
  --bitcoin-orange-dark: #c77719;    /* Variante scura */
  --bitcoin-orange-light: #ffb84d;   /* Variante chiara */
  --bitcoin-orange-glow: rgba(247, 147, 26, 0.3); /* Effetto glow */
}
```

### Animazioni Particelle
Configura in `js/particles.js`:

```javascript
this.particleCount = 50;  // Numero di particelle
this.vx = (Math.random() - 0.5) * 0.5;  // Velocità X
this.vy = (Math.random() - 0.5) * 0.5;  // Velocità Y
```

### Snippet Codice
Modifica in `js/typing.js`:

```javascript
const codeSnippets = [
  // Aggiungi i tuoi snippet di codice
];
```

## 🚀 Avvio Rapido

1. **Clona o scarica** il progetto
2. **Apri** `index.html` nel browser
3. **Nessuna dipendenza** richiesta

## 📱 Responsive Design

- **Desktop**: Layout completo con tutte le animazioni
- **Tablet**: Layout adattato con touch interactions
- **Mobile**: Versione ottimizzata con animazioni ridotte

## ⌨️ Shortcuts

- **T**: Toggle tema dark/light
- **Escape**: Chiudi tooltip/modali
- **↑/↓**: Navigazione tra sezioni
- **Click**: Interazioni con tech stack

## 🎯 Proof of Ability

Questo portfolio dimostra competenze in:

- **Frontend Development**: React-like component architecture
- **Performance Optimization**: Efficient animations e lazy loading
- **User Experience**: Micro-interactions e accessibility
- **Modern CSS**: Variables, grid, animations, responsive design
- **JavaScript ES6+**: Classes, modules, async patterns
- **Cross-browser Compatibility**: Standard web APIs
- **Mobile-First Design**: Responsive layouts
- **Animation Principles**: Smooth, performant interactions

## 🔧 Estensioni

Il progetto è strutturato per essere facilmente esteso:

- **Nuove sezioni**: Aggiungi componenti in `components/`
- **Nuove animazioni**: Estendi le classi JavaScript esistenti
- **Nuovi temi**: Modifica le CSS variables
- **Backend integration**: Pronto per API calls

---

**Creato con ❤️ e 🧡 Bitcoin Orange**
