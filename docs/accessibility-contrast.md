# WCAG AA text contrast inventory

Ratios were calculated using WCAG relative luminance on the colors actually used by the application UI as implemented on September 27, 2026. AA requires at least 4.5:1 for normal text and 3:1 for large text.

| Foreground | Background | Ratio | Result |
| --- | --- | ---: | --- |
| `#FFFFFF` | saffron `#C0561F` | 4.57:1 | AA normal text |
| cream `#FBF6EE` | slate `#4A6078` | 6.03:1 | AA normal text |
| slate `#4A6078` | cream `#FBF6EE` | 6.03:1 | AA normal text |
| slate `#4A6078` | white `#FFFFFF` | 6.49:1 | AA normal text |
| body `#17212B` | cream `#FBF6EE` | 15.14:1 | AA normal text |
| body `#17212B` | white `#FFFFFF` | 16.29:1 | AA normal text |
| saffron `#C0561F` | white `#FFFFFF` | 4.57:1 | AA normal text |

Gold `#C8922A` is defined as a fixed design token but is not currently used as a text or background color. Any later text/background usage must be added here and pass AA before release.
