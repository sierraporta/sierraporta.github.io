<!-- MathJax v3 (pégalo al inicio del .md) -->
<script>
  window.MathJax = {
    tex: {inlineMath: [['\\(','\\)']], displayMath: [['$$','$$']]}
  };
</script>
<script async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>

# Curso de **Storytelling y Narrativa de Datos**
<img class="float-left float--sm"
     src="/Figures/storytelling.png"
     alt="Storytelling y Narrativa de Datos"
     width="420" height="280" decoding="async">

## Presentación del curso y motivación
En ciencia, empresa y gobierno, la diferencia entre “tener un resultado” y “lograr impacto” suele estar en la narrativa: qué pregunta se hizo, por qué importa, qué evidencia la respalda y qué decisión habilita. Este curso entrena al estudiante para construir **historias rigurosas con datos**, combinando principios de diseño, estructura narrativa, comunicación clara y práctica reproducible en **Jupyter notebooks**.

Más que “hacer gráficos bonitos”, el objetivo es aprender a **tomar decisiones** (qué mostrar, qué omitir, cómo ordenar, cómo anotar, cómo reconocer límites) y defenderlas con criterio, ética y transparencia.

## Libros base (eje del curso)
- **SWD**: *Storytelling with Data* — Cole Nussbaumer Knaflic
- **SWD Practice**: *Storytelling with Data: Let’s Practice!* — Cole Nussbaumer Knaflic
- **SWY**: *Storytelling with You* — Cole Nussbaumer Knaflic

> Nota: SWD aporta principios; SWD Practice entrena con ejercicios; SWY organiza el acto de presentar (planear–crear–entregar).

## Objetivos del curso
- Formular mensajes claros: **audiencia, propósito, contexto y “Big Idea”**.
- Diseñar visualizaciones efectivas: selección de gráficos, jerarquía visual, anotación y accesibilidad.
- Convertir análisis exploratorio (EDA) en narrativa explicativa (explanatory).
- Construir entregables reproducibles con **Jupyter** (markdown + código + visualización).
- Desarrollar una historia de datos de extremo a extremo: pregunta → evidencia → insight → decisión.
- Incorporar criterios de ética: sesgos, manipulación visual, transparencia y límites.

## Metodología del curso
Curso de **12 semanas**, con un máximo de **1 notebook por semana**. Cada notebook es un módulo autocontenido con:
- objetivo + pregunta guía,
- dataset (real o simulado) + EDA mínima,
- visualizaciones (con decisiones explícitas),
- narrativa (secciones en markdown),
- ejercicios propuestos.

El trabajo es acumulativo: desde la semana 3 cada equipo avanza un **proyecto incremental** que culmina en una historia final (notebook + presentación).

## Evaluación (sugerencia)

| Componente | Peso | Descripción |
|---|---:|---|
| Quizzes / controles cortos | 10% | Conceptos (audiencia, diseño, ética, selección de gráficos, narrativa) |
| Notebooks semanales (mini–labs) | 35% | Ejecución + interpretación + decisiones de narrativa (reproducibles) |
| Proyecto intermedio | 20% | Historia corta (5–7 min) + notebook consolidado (versión 1) |
| Proyecto final | 35% | Notebook final + presentación + defensa de decisiones + reflexión |

## Herramientas y stack sugerido (Python)
- **Base**: `pandas`, `numpy`, `matplotlib`, `seaborn`
- **Interactividad** (elige 1): `plotly` / `altair` / `bokeh`
- **Mapas** (si aplica): `folium` (o `geopandas` + `contextily` si el grupo lo domina)
- **Export/publicación**: `nbconvert` (HTML/PDF), o demo opcional con `voila` / `streamlit`

## Cronograma y notebooks (12 semanas)
> Regla: **1 notebook por semana**. Cada semana incluye: lectura, exposición corta (estudiante), laboratorio y entregable.

**Repositorio sugerido** Tendremos un repositorio para ir subiendo materiales, el cual puedes encontrarlo en:  
[StoryTelling-y-Narrativa-de-Datos](https://github.com/sierraporta/StoryTelling-y-Narrativa-de-Datos)

| Semana | Notebook | Tema central | Lecturas (SWD / Practice / SWY) | En clase (exposición + taller) | Trabajo / Entregable |
|---:|---|---|---|---|---|
| 1 | `Notebooks/ST_01_context_message.ipynb` | Audiencia, propósito y Big Idea | SWD: contexto y objetivo; SWY: audiencia y mensaje; Practice: ejercicios de contexto | Mini–charla: “mostrar vs contar”. Taller: convertir una tabla en un mensaje accionable. | **Tarea 1**: brief narrativo (audiencia, acción deseada, Big Idea) + notebook con EDA mínima. |
| 2 | `Notebooks/ST_02_choose_visual.ipynb` | Elegir el gráfico correcto | SWD: selección de visual; Practice: “choose an effective visual” | Taller guiado: mismo dato → 3 gráficos → justificar el mejor. | **Mini–lab**: galería de 6 gráficos con “cuándo sí/cuándo no” en markdown. |
| 3 | `Notebooks/ST_03_declutter_focus.ipynb` | Declutter + foco atencional | SWD: clutter + focus attention; Practice: ejercicios de limpieza/anotación | **Kickoff proyecto** (equipos): dataset real + pregunta. Clínica de “antes/después”. | **Entregable P1**: dataset + pregunta + stakeholders + 1 visual antes/después con rationale. |
| 4 | `Notebooks/ST_04_design_system.ipynb` | Pensar como diseñador (consistencia y accesibilidad) | SWD: think like a designer; Practice: accesibilidad y consistencia | Taller: estilo (colores, tipografía, anotación). Revisión por pares. | **Tarea 2**: “style guide” del proyecto (reglas de color, texto, anotación, accesibilidad). |
| 5 | `Notebooks/ST_05_story_structure.ipynb` | Estructura narrativa: arco, orden y tensión | SWD: storytelling; SWY: estructura/guion; Practice: ejercicios de secuencia | Storyboarding “low-tech” → traducir a secciones del notebook. | **Entregable P2**: storyboard + outline del notebook final (secciones y mensajes por sección). |
| 6 | `Notebooks/ST_06_from_eda_to_explanatory.ipynb` | De EDA a narrativa explicativa | SWD Practice: ejercicios de edición/selección; SWD: énfasis y anotación | Clínica: “hallazgos candidatos” vs “hallazgos narrables”. Edición: qué se queda fuera. | **Quiz 1** + notebook con 3 hallazgos priorizados y justificación (por audiencia). |
| 7 | `Notebooks/ST_07_interactivity_dashboard.ipynb` | Interactividad (dashboards que cuentan historia) | SWD: claridad y foco; SWY: preparar para presentar; lectura técnica breve (elegida por el profe) | Demo: tooltips, filtros, small multiples. Discusión: cuándo la interactividad ayuda o distrae. | **Tarea 3**: mini-dashboard (1 pantalla) + texto guía (narrativa de uso). |
| 8 | `Notebooks/ST_08_maps_geostory.ipynb` | Geostorytelling (si aplica) | SWD: contexto y diseño; Practice: ejercicios de comparación; nota sobre sesgos del mapa | Taller: mapa con anotaciones + capas de contexto. | **Entregable P3**: componente geográfico **o** alternativa: segmentación / cohortes como “mapa conceptual”. |
| 9 | `Notebooks/ST_09_case_clinic_critique.ipynb` | Clínica de casos y crítica (repair session) | Practice: ejercicios de crítica; SWD: refuerzo de principios | Cada equipo trae: 2 visuales propios + 1 visual externo “malo” y lo repara. | **Proyecto intermedio (20%)**: historia corta (5–7 min) + notebook v1 (6–10 visuales) + Q&A. |
| 10 | `Notebooks/ST_10_ethics_bias_transparency.ipynb` | Ética y transparencia | SWD/SWY: claridad y honestidad; guía del curso: checklist ético | Debate: manipulación visual, cherry-picking, escalas, omisiones, privacidad. | **Tarea 4**: “Ethics card” del proyecto (sesgos, riesgos, mitigación, límites y supuestos). |
| 11 | `Notebooks/ST_11_delivery_rehearsal.ipynb` | Entrega: guion, slides y ensayo | SWY: plan–create–deliver (entrega y práctica) | Ensayo tipo conferencia: ritmo, transiciones, slides limpios, respuesta a preguntas. | **Pre-final**: draft de slides + notebook “casi final” + lista priorizada de mejoras. |
| 12 | `Notebooks/ST_12_final_story.ipynb` | Cierre: historia completa + exposición pública | Relectura selectiva (según debilidades detectadas) | Presentaciones finales + rúbrica + auto/co-evaluación reflexiva. | **Proyecto final (35%)**: notebook final + presentación + defensa de decisiones + reflexión ética. |

## Exposiciones de estudiantes (formato sugerido)
- Desde semana 2: **1 exposición corta por sesión** (8–10 min).
- Contenido: un ejemplo real (bueno o malo) + diagnóstico con lenguaje SWD (qué funciona, qué distrae, qué mejoraría).
- Entregable: 1 slide + 1 visual “reparado” (imagen o código) + 5 bullets de lecciones.

## Proyecto final (estructura mínima)
1. **Pregunta y audiencia** (quién decide qué con esto).
2. **Datos**: fuente, calidad, límites, supuestos.
3. **Historia**: estructura (inicio–tensión–resolución) con mensajes por sección.
4. **Visuales**: decisiones justificadas (por qué ese gráfico, escala, anotación, color).
5. **Transparencia**: qué no se pudo concluir, incertidumbre, sesgos potenciales.
6. **Reproducibilidad**: notebook limpio, dependencias, instrucciones (README).

## Datasets recomendados (para prácticas)
- Our World in Data: https://ourworldindata.org/
- World Bank Data: https://data.worldbank.org/
- Datos Abiertos Colombia: https://www.datos.gov.co/
- NYC Open Data: https://opendata.cityofnewyork.us/
- Kaggle Datasets: https://www.kaggle.com/datasets
