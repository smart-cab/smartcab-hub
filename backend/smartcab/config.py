class TextFormating:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


def print_worning(text: str):
    print(f"{TextFormating.UNDERLINE}{TextFormating.WARNING}\
Warning: {text}{TextFormating.ENDC}")


def print_succes(text: str):
    print(f"{TextFormating.BOLD}{TextFormating.OKGREEN}\
✔ {text}{TextFormating.ENDC}")

