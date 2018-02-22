# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security

## [1.1.0] - 2018-02-21
### Added
- `getStockName` 在上市/上櫃列表中尋找個股
- `getOTCStocks` 取得上櫃股票列表，尚無重新抓取功能
- `getTSEStocks` 取得上市股票列表，尚無重新抓取功能

## [1.0.11] - 2018-02-14
### Add
- `getStockInfo` 一次性抓取即時股價資料 
- `getStockInfoStream` 回傳 Rx.Observable 連續抓取即時股價資料

[Unreleased]: https://github.com/kaddopur/twse/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/kaddopur/twse/compare/v1.0.11...v1.1.0
[1.0.11]: https://github.com/kaddopur/twse/compare/v1.0.8...v1.0.11
