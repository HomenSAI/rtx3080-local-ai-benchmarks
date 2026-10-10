# Project time tracking

[`scripts/time_tracking.py`](scripts/time_tracking.py) keeps an append-only JSONL work log for later reports.

```bash
python scripts/time_tracking.py add --hours 2.5 --note "Test analysis"
python scripts/time_tracking.py start --note "Runner changes"
python scripts/time_tracking.py stop
python scripts/time_tracking.py report --format json
```

The report includes hours, exact workdays (`days_exact`) and a separate half-up rounded whole-day value (`days_rounded`). The default is 8 hours per workday and can be changed with `--hours-per-day`. The log defaults to `time-log.jsonl`; timer state stays outside Git.
