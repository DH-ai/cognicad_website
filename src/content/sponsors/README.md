Add one JSON file per sponsor in this folder.

Required fields:
- name
- phrase
- href
- order

Optional fields:
- eyebrow
- location
- badge

Badge (logo) usage:
- Place logo files in the `public/sponsors/` folder (SVG or PNG recommended).
- In the sponsor JSON add the `badge` field with the file name, e.g. `"badge": "conscious-engines.svg"`.
- The ticker will display the logo if `badge` is present, otherwise it falls back to the sponsor `name`.

Example sponsor JSON:

```
{
	"name": "Conscious Engines",
	"phrase": "Trusted by",
	"href": "https://consciousengines.com",
	"order": 1,
	"badge": "conscious-engines.svg"
}
```
