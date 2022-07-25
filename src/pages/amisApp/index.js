import * as React from 'react';
import axios from 'axios';
import copy from 'copy-to-clipboard';

import { render as renderAmis, ToastComponent, AlertComponent } from 'amis';
import { alert, confirm } from 'amis/lib/components/Alert';
import { toast } from 'amis/lib/components/Toast';

let amisScoped;
const theme = 'cxd';
const locale = 'zh-CN';

class AmisApp extends React.Component {
  render() {
    return (
      <div>
        <h1>Amis</h1>
        <ToastComponent
          theme={theme}
          key="toast"
          position={'top-right'}
          locale={locale}
        />
        <AlertComponent theme={theme} key="alert" locale={locale} />

        {renderAmis(
          {
            type: 'page',
            title: '简单页面',
            body: '内容',
          },
          {
            type: 'divider',
          },
          {
            type: 'form',
            body: [
              {
                type: 'input-text',
                name: 'name',
                label: '姓名',
              },
            ],
          },
          {
          // 下面三个接口必须实现
            fetcher: ({
              url, // 接口地址
              method, // 请求方法 get、post、put、delete
              data, // 请求数据
              responseType,
              config, // 其他配置
              headers, // 请求头
            }) => {
              config = config || {};
              config.withCredentials = true;
              responseType && (config.responseType = responseType);

              if (config.cancelExecutor) {
                config.cancelToken = new axios.CancelToken(
                  config.cancelExecutor,
                );
              }

              config.headers = headers || {};

              if (method !== 'post' && method !== 'put' && method !== 'patch') {
                if (data) {
                  config.params = data;
                }

                return axios[method](url, config);
              } else if (data && data instanceof FormData) {
                config.headers = config.headers || {};
                config.headers['Content-Type'] = 'multipart/form-data';
              } else if (
                data &&
              typeof data !== 'string' &&
              !(data instanceof Blob) &&
              !(data instanceof ArrayBuffer)
              ) {
                data = JSON.stringify(data);
                config.headers = config.headers || {};
                config.headers['Content-Type'] = 'application/json';
              }

              return axios[method](url, data, config);
            },
            isCancel: (value) => axios.isCancel(value),
            copy: (content) => {
              copy(content);
              toast.success('内容已复制到粘贴板');
            },
            theme,
          },
          {

          },
        )}
      </div>

    );
  }
}

export default AmisApp;
