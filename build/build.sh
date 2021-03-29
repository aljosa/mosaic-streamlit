pyinstaller --additional-hooks-dir=hooks \
			--hidden-import missionbio.mosaic \
			--hidden-import missionbio.h5 \
			--hidden-import plotly \
			--clean -w run.py

cp ../*.py ./dist/run.app/Contents/Resources/
cp -r ../tasks ./dist/run.app/Contents/Resources/
