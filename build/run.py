import os
import sys

if __name__ == '__main__':

    launchdir = os.path.dirname(sys.argv[0])

    if launchdir == '':
        launchdir = '.'

    print('Launch dir ', launchdir)
    # streamlit can take a while to import
    from streamlit import cli as stcli

    sys.argv = ["streamlit", "run", f"{launchdir}/app.py", "--server.port=10000", "--server.headless=true", "--global.developmentMode=false"]
    sys.exit(stcli.main())
