from PyInstaller.utils.hooks import collect_all, collect_data_files

datas = collect_data_files(
    'plotly',
    include_py_files=True,
    includes=['**/*.py', 'package_data/**/*.*']
)
# datas, binaries, hiddenimports = collect_all('plotly')
