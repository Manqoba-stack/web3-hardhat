from binance.client import Client
import os
from decouple import config
import pandas as pd

client=Client(api_key=config('TEST_BINANCE_API_KEY'),api_secret= config('TEST_BINANCE_SECRETE_KEY'),tld='com',testnet=True)

try:
    if len(client.ping())==0:
        print("Ping Successful")
        if client.get_system_status().get('status')==0:
            print("System Status: Operational")

            account = client.get_account()
            df=pd.DataFrame(account.get('balances'))
            print(df)

            print("_____________________________")

            response= client.get_symbol_ticker(symbol='BTCUSDT')
            print(response)

            av_price=client.get_avg_price(symbol='BTCUSDT')
            print("Average Price: ",av_price)

            last24=client.get_ticker(symbol='BTCUSDT')
            last24df=pd.DataFrame(last24,index=[0])
            print(last24df)
            # df.free=pd.to_numeric(df.free,errors='coerce')
            # df.locked=pd.to_numeric(df.locked,errors='coerce')
            # df.lo
except Exception as e:
    print(e)
    exit()
