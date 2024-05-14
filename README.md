# DJI Cloud API

## What is the DJI Cloud API?

The launch of the Cloud API mainly solves the problem of developers reinventing the wheel. For developers who do not need in-depth customization of APP, they can directly use DJI Pilot2 to communicate with the third cloud platform, and developers can focus on the development and implementation of cloud service interfaces.

## Docker

If you don't want to install the development environment, you can try deploying with docker. [Click the link to download.](https://terra-sz-hc1pro-cloudapi.oss-cn-shenzhen.aliyuncs.com/c0af9fe0d7eb4f35a8fe5b695e4d0b96/docker/cloud_api_sample_docker.zip)

## Usage

For more documentation, please visit the [DJI Developer Documentation](https://developer.dji.com/doc/cloud-api-tutorial/cn/).

## Latest Release

Cloud API 1.10.0 was released on 7 April 2024. For more information, please visit the [Release Note](https://developer.dji.com/doc/cloud-api-tutorial/cn/).

## License

Cloud API is MIT-licensed. Please refer to the LICENSE file for more information.

### 问题解决
安装依赖过程中报错： 
  npm ERR! syscall getaddrinfo
  stamp=1619133505879&other_urls=https%3A%2F%2Fregistry.nlark.com%2Fwrappy%2Fdownload%2Fwrappy-1.0.2.tgz failed, reason: getaddrinfo ENOTFOUND registry.nlark.com
解决：全局搜索这个源地址，替换成淘宝镜像