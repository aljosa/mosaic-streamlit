pyinstaller --additional-hooks-dir=hooks --hidden-import igraph._igraph --hidden-import missionbio.mosaic --hidden-import missionbio.h5 --hidden-import plotly --clean run.py