<!-- MathJax v3 (pégalo al inicio del .md) -->
<script>
  window.MathJax = {
    tex: {inlineMath: [['\\(','\\)']], displayMath: [['$$','$$']]}
  };
</script>
<script async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>

# Curso de **Machine Learning**
<img class="float-left float--sm"
     src="/Figures/ml.png"
     alt="Machine Learning"
     width="420" height="280" decoding="async">

## Presentación del curso y motivación
Machine Learning (ML) se ha convertido en una herramienta central para la investigación moderna: permite construir modelos que aprenden patrones a partir de datos y generalizan a escenarios nuevos, con aplicaciones que van desde ciencias naturales y salud hasta industria, finanzas y políticas públicas. Este curso está diseñado para doctorado con un enfoque riguroso y práctico: además de entrenar modelos, discutiremos criterios de evaluación, fuentes de sesgo, diseño experimental con datos, validación robusta y reproducibilidad computacional.

Más que una colección de algoritmos, el curso enfatiza el **ciclo completo**: formulación del problema, diseño del dataset (y sus limitaciones), preprocesamiento y *pipelines*, entrenamiento, evaluación honesta, ajuste, interpretación y finalmente despliegue y comunicación científica de resultados.

## Novedad e importancia
El énfasis del curso no es “correr modelos”, sino **entender**:
- qué hipótesis estadística / geométrica está detrás de cada algoritmo,
- cómo se comportan los métodos bajo ruido, desbalance, *shift* de distribución y *data leakage*,
- y cómo reportar resultados con prácticas reproducibles (notebooks, control de versiones, reportes claros).

La meta es que el estudiante pueda **defender** decisiones metodológicas con rigor, y no solo presentar métricas “altas”.

## Objetivos del curso
- Construir una base sólida sobre aprendizaje supervisado, no supervisado y por refuerzo (visión general).
- Dominar el flujo de trabajo en ML con énfasis en **validación**, **métricas** y control de sobreajuste.
- Implementar modelos fundamentales (regresión lineal/logística, árboles, ensambles, SVM, ANN) y comprender sus supuestos.
- Aplicar métodos no supervisados (K-Means, PCA, DBSCAN) y evaluar calidad de clusters.
- Realizar optimización de hiperparámetros de manera reproducible (Grid/Random y, opcionalmente, bayesiana).
- Preparar un entregable final con estándares de investigación: reporte, repositorio reproducible y (si aplica) demo de despliegue.

## Metodología del curso
El curso se organiza en **16 semanas**, con un máximo de **1 notebook por semana** (ocasionalmente 2 si es imprescindible separar teoría + laboratorio extenso). Cada notebook es un módulo autocontenido con:
- objetivo y preguntas guía,
- dataset (simulado y/o real) + EDA mínima,
- baseline + pipeline (split + preprocesamiento),
- modelo(s) y diagnóstico,
- evaluación (métricas + gráficos),
- ejercicios propuestos.

Se espera trabajo continuo y acumulativo: los notebooks alimentan el **proyecto final**, que integra todas las etapas del ciclo de vida del modelo.

## Evaluación (sugerencia)

| Componente | Peso | Descripción |
|---|---:|---|
| Quizzes / controles cortos | 15% | Conceptos y lectura crítica (métricas, validación, supuestos) |
| Notebooks semanales (mini–labs) | 35% | Ejecución + interpretación + ejercicios (reproducibles) |
| Tarea de evaluación robusta | 15% | CV, comparación de modelos, y reporte de incertidumbre |
| Proyecto final | 35% | Repositorio, reporte, presentación y discusión |

## Cronograma y notebooks (16 semanas)
> Regla: **1 notebook por semana**. Solo se usan 2 cuando el laboratorio es largo (marcado como “Opcional B”).

Todos los notebooks estarán en: [https://github.com/sierraporta/Intro-Machine-Learning-UnderGraduated](https://github.com/sierraporta/Intro-Machine-Learning-UnderGraduated).

| Semana | Notebook | Tema central | Descripción (temas de la semana) |
|---:|---|---|---|
| 1 | `Lectures/Slices`: [ml_intro_ibm_unified.pdf](https://github.com/sierraporta/Intro-Machine-Learning-UnderGraduated/blob/main/Presentations/ml_intro_ibm_unified.pdf) `Notebooks/ML_01_workflow`: [ML_00_philosophy_splitting_generalization.ipynb](https://github.com/sierraporta/Intro-Machine-Learning-UnderGraduated/blob/main/Notebooks/ML_00_philosophy_splitting_generalization.ipynb), [ML_01_workflow_splits_leakage.ipynb](https://github.com/sierraporta/Intro-Machine-Learning-UnderGraduated/blob/main/Notebooks/ML_01_workflow_splits_leakage.ipynb) | Introducción + workflow | Qué es ML (generalización); tipos (supervisado/no supervisado/refuerzo); workflow end-to-end; splits train/val/test; leakage (y cómo evitarlo); baselines (Dummy) como piso de desempeño. |
| 2 | `Notebooks/ML_02_preprocessing.ipynb`: [ML_02_preprocessing_tabular.ipynb](https://github.com/sierraporta/Intro-Machine-Learning-UnderGraduated/blob/main/Notebooks/ML_02_preprocessing_tabular.ipynb) | Preprocesamiento | Limpieza; faltantes; escalado; one-hot; desbalance; `Pipeline` + `ColumnTransformer`. |
| 3 | `Notebooks/ML_03_metrics_general.ipynb`: [ML_03_core_metrics_regression_classification.ipyn](https://github.com/sierraporta/Intro-Machine-Learning-UnderGraduated/blob/main/Notebooks/ML_03_core_metrics_regression_classification.ipynb) | Métricas (panorama) | MAE/RMSE/R²; accuracy/precision/recall/F1; ROC/PR; calibración básica; umbrales. |
| 4 | `Lectures/Slices`: [MACHINE_LEARNING_notes_RIDGE_LASSO.pdf](https://github.com/sierraporta/Intro-Machine-Learning-UnderGraduated/blob/main/Notas/MACHINE_LEARNING_notes_RIDGE_LASSO.pdf) `Notebooks/ML_04_linear_ridge_lasso.ipynb`: [ML_04_Ridge_Lasso_regression_classification.ipynb](https://github.com/sierraporta/Intro-Machine-Learning-UnderGraduated/blob/main/Notebooks/ML_04_Ridge_Lasso_regression_classification.ipynb) | Regresión lineal + regularización | OLS vs GD (visión); Ridge/Lasso; sesgo-varianza; selección de $\lambda$. Unas notas introductorias de mi autoria: [MACHINE_LEARNING_notes_RIDGE_LASSO.pdf](https://github.com/sierraporta/Intro-Machine-Learning-UnderGraduated/blob/main/Notas/MACHINE_LEARNING_notes_RIDGE_LASSO.pdf).|
| 5 | `Notebooks/ML_05_logistic_calibration.ipynb`: [ML_05_logistic_logloss_calibration.ipynb](https://github.com/sierraporta/Intro-Machine-Learning-UnderGraduated/blob/main/Notebooks/ML_05_logistic_logloss_calibration.ipynb), unas notas introductorias interesantes: [LOGISTIC REGRESSION: Regression for Classification, por Erin Bugbee y Jared Wilber](https://mlu-explain.github.io/logistic-regression/) | Regresión logística | Sigmoide; log-loss; matriz de confusión; umbral por costos; calibración y Brier (si aplica).  |
| 6 | `Notebooks/ML_06_knn_cv_scaling.ipynb`: [ML_06_knn_cv_scaling.ipynb](https://github.com/sierraporta/Intro-Machine-Learning-UnderGraduated/blob/main/Notebooks/ML_06_knn_cv_scaling.ipynb), un ejercicio en clase (basado en las notas de pdf de mi autoria): [Book_Knn.xlsx](https://github.com/sierraporta/Intro-Machine-Learning-UnderGraduated/blob/main/Notas/Book_Knn.xlsx). | KNN | Distancias; necesidad de escalado; selección de \(k\); validación cruzada; sensibilidad. Unas notas introductorias de mi autoria: [MACHINE_LEARNING_notes_KNN.pdf](https://github.com/sierraporta/Intro-Machine-Learning-UnderGraduated/blob/main/Notas/MACHINE_LEARNING_notes_KNN.pdf)|
| 7 | `Notebooks/ML_07_trees.ipynb`: [ML_07_decision_trees_feature_importance_overfitting.ipynb](https://github.com/sierraporta/Intro-Machine-Learning-UnderGraduated/blob/main/Notebooks/ML_07_decision_trees_feature_importance_overfitting.ipynb) | Árboles | Splits (Gini/MSE); sobreajuste; poda implícita con `max_depth`; interpretabilidad. |
| 7B (Workshop) | Dos modelos en uno: `Notebooks/Clase_KNN_DecisionTree_Movies.ipynb`: [Clase_KNN_DecisionTree_Movies.ipynb](https://github.com/sierraporta/Intro-Machine-Learning-UnderGraduated/blob/main/Notebooks/Clase_KNN_DecisionTree_Movies.ipynb). Datos para el ejercicio: (`Movie_classification.csv`) [Conjunto de datos](https://www.kaggle.com/datasets/balakrishcodes/others) | Árboles | MiniWorkshop. Datos: [Conjunto de datos](https://www.kaggle.com/datasets/balakrishcodes/others), Introducción. |
| 8 | `Notebooks/ML_08a_random_forest_operative_intro.ipynb`: [ML_08a_random_forest_operative_intro.ipynb](https://github.com/sierraporta/Intro-Machine-Learning-UnderGraduated/blob/main/Notebooks/ML_08a_random_forest_operative_intro.ipynb), `Notebooks/ML_08_random_forest.ipynb`: [ML_08_random_forest_feature_importance.ipynb](https://github.com/sierraporta/Intro-Machine-Learning-UnderGraduated/blob/main/Notebooks/ML_08_random_forest_feature_importance.ipynb) | Random Forest | Bagging; reducción de varianza; OOB (si se usa); importancias; estabilidad. |
| 9 | `Notebooks/ML_09_svm.ipynb`: [ML_09_svm_kernels_tuning.ipynb](https://github.com/sierraporta/Intro-Machine-Learning-UnderGraduated/blob/main/Notebooks/ML_09_svm_kernels_tuning.ipynb) | SVM | Márgenes; kernel trick (visión); \(C\), \(\gamma\); tuning mínimo; ROC/PR. |
| 9B (opc.) | `Notebooks/ML_09B_svm_kernels.ipynb` | SVM kernels (profundización) | Comparación de kernels y frontera; sensibilidad a hiperparámetros; buenas prácticas. |
| 10 | `Lectures/Slices(MLP)`: [Neural_Blueprint.pdf](https://github.com/sierraporta/Intro-Machine-Learning-UnderGraduated/blob/main/Presentations/Neural_Blueprint.pdf), `Notebooks/ML_10_ann_mlp.ipynb`: [ML_10_neuronal_networks_MLP_regularisation.ipynb](https://github.com/sierraporta/Intro-Machine-Learning-UnderGraduated/blob/main/Notebooks/ML_10_neuronal_networks_MLP_regularisation.ipynb) | Redes neuronales (ANN) | MLP; backprop (conceptual); regularización (early stopping/dropout); curvas de aprendizaje. |
| 11 | `Notebooks/ML_11_kmeans.ipynb` | K-Means | Objetivo; inicialización; elección de \(k\); elbow y silhouette; interpretación de clusters. |
| 12 | `Notebooks/ML_12_pca.ipynb` | PCA | Varianza explicada; proyección; reconstrucción; PCA como preprocesamiento para clustering. |
| 13 | `Notebooks/ML_13_dbscan_tsne.ipynb` | DBSCAN + visual | Densidad; elección de `eps`; clusters no convexos; t-SNE como visualización (no métrica). |
| 14 | `Notebooks/ML_14_cv_robust_eval.ipynb` | Evaluación robusta | K-fold/Stratified; `Pipeline` + CV; comparación por media±std; errores comunes. |
| 15 | `Notebooks/ML_15_tuning_grid_random.ipynb` | Tuning | Grid vs Random; espacio de búsqueda; *overfitting* al validation; reporte reproducible. |
| 15B (opc.) | `Notebooks/ML_15B_bayes_opt.ipynb` | Bayes opt (Optuna) | Optimización bayesiana; *pruning*; cuándo sí/cuándo no; comparación con Random. |
| 16 | `Notebooks/ML_16_deploy_checklist.ipynb` | Despliegue + cierre | Serialización; API mínima; consideraciones de monitoreo; checklist de producción; cierre del proyecto. |

## La Comunicación de la Ciencia
La comunicación de la ciencia es tan clave como la obtención de resultados. De poco sirven los resultados si los pares y la comunidad no logran captar su importancia. Durante este curso haremos ejercicios de cómo expresarnos en tres géneros de la comunicación científica:
- Propuestas y reportes de investigación
- Presentaciones de ideas o proyectos científicos
- Poster o carteles para presentar resultados científicos

Una referencia que recomiendo ampliamente para entender que las ideas no bastan es el escrito de Deconinck, K. (2015). _Trust me, I'm a doctor: a PhD survival guide_. Journal of Economic Education, 46(4), 360-375. [Deconinck, K. (2015)](https://lirias.kuleuven.be/retrieve/316851). Una maravilla para entender que las ideas no bastan.

## Proyecto final (Unidad 7)
El proyecto integra todo el ciclo de vida del modelo: datos → preprocesamiento → modelado → evaluación → (opcional) despliegue.

| Proyectos finales | Semestre | Enlace |
|---:|---|---|
| Lista de proyectos a elegir (Pueden elegir o inventar otros) | 202610 | [ProyectosFCD202610.md](https://github.com/sierraporta/Intro-Machine-Learning-UnderGraduated/blob/main/Notas/ProyectosFCD202610.md) |

### Entregables mínimos
1. Repositorio con estructura limpia y reproducible (README + instrucciones).
2. Notebook principal del experimento (pipeline completo).
3. Reporte (4–8 páginas o equivalente):
   - problema, dataset, limitaciones,
   - metodología,
   - evaluación (métricas + gráficos),
   - análisis de errores,
   - discusión crítica.
4. Presentación (10–12 min) + preguntas.

## Datasets recomendados (para prácticas)
- UCI Machine Learning Repository: https://archive.ics.uci.edu/
- OpenML: https://www.openml.org/search?type=data
- Kaggle Datasets: https://www.kaggle.com/datasets
- Hugging Face Datasets: https://huggingface.co/datasets
- Datos Abiertos Colombia: https://www.datos.gov.co/
