import paramiko

SSHC = paramiko.SSHClient()
SSHC.set_missing_host_key_policy(paramiko.AutoAddPolicy())


class SSHConnectionError(paramiko.SSHException):
    pass
