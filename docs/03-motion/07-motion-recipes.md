# Motion Recipes

Version: 1.0  
Status: Critical

## Motion Philosophy

Animation erklärt.  
Animation führt.  
Animation überrascht.  
Animation dekoriert niemals.

Motion ist ein zentraler Teil der ALX Studio Experience.

## Global Motion Rules

- Motion muss hochwertig wirken.
- Motion darf nie hektisch sein.
- Motion darf nie generisch wirken.
- Motion muss Inhalte unterstützen.
- Motion muss responsive sauber funktionieren.
- prefers-reduced-motion muss respektiert werden.

## Hero Recipes

### Word Reveal

Wörter erscheinen gestaffelt.

Initial:
opacity 0  
y 40  
filter blur 8px

Animate:
opacity 1  
y 0  
filter blur 0

Stagger:
80ms bis 120ms

### Large Typography Reveal

Große Headline erscheint nicht auf einmal, sondern in rhythmischen Blöcken.

### Background Depth

Dunkler Hintergrund darf leichte Tiefe haben durch:

- Noise
- subtile Gradients
- leichte Vignette
- große Schattenflächen

Keine Neon-Orbs.

### Parallax Layer

Einzelne Elemente bewegen sich beim Scrollen leicht unterschiedlich.

Sehr subtil.

## Scroll Recipes

### Section Reveal

Initial:
opacity 0  
y 48

Animate:
opacity 1  
y 0

Duration:
500ms bis 700ms

### Mask Reveal

Für große Textblöcke oder Bilder.

Text oder Card wird durch eine Maske sichtbar.

### Sticky Story

Einzelne Bereiche dürfen sticky sein, während Inhalte daneben weiter scrollen.

Nur verwenden, wenn es Storytelling verbessert.

### Progress Line

Timeline oder Storyline kann eine Linie haben, die beim Scrollen wächst.

## Card Recipes

### Hover Lift

translateY(-6px)  
scale(1.01)  
border-color heller  
background leicht heller

### Card Tilt

Sehr dezente Rotation bei Hover.

Maximal:
rotate 0.5deg bis 1deg

### Depth

Cards können Tiefe bekommen durch:

- Schatten
- Layer
- Border
- leichte Translation

Keine starken Glows.

## Button Recipes

### Magnetic Button

Button reagiert minimal auf Cursor-Nähe.

Nur auf Desktop.

### Arrow Slide

Pfeil bewegt sich bei Hover leicht nach rechts.

### Underline Motion

Textlinks erhalten animierte Underline.

## Timeline Recipes

Timeline baut sich beim Scrollen auf.

- Linie wächst vertikal.
- Einträge erscheinen nacheinander.
- Aktiver Eintrag bekommt mehr Kontrast.

## Image Recipes

Falls Bilder verwendet werden:

- Mask Reveal
- Slow Zoom
- Parallax
- Clip Path Reveal
- keine Stockfoto-Wirkung

## Microinteractions

Erlaubt:

- Navbar Active State
- Button Hover
- Card Hover
- Input Focus
- Contact Link Feedback
- Language Toggle Motion
- Scroll Indicator

## Avoid

- Bounce
- wilde Springs überall
- Daueranimationen ohne Zweck
- blinkende Elemente
- lange Delays
- unnötige 3D-Effekte
- KI-typische Glow Animationen

## Acceptance Criteria

Die Website darf sich nicht statisch anfühlen.

Jede Hauptsection braucht mindestens eine hochwertige Motion-Idee.

Motion muss sichtbar sein, aber nicht nerven.
