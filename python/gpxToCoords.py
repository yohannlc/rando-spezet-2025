import gpxpy
import os

def clear_file(file_path):
    with open(file_path, 'w') as f:
        f.truncate(0)

def gpx_to_js(gpx_file, js_file, circuit):
    with open(gpx_file, 'r') as f:
        gpx = gpxpy.parse(f)

    js_content = f"// Coordonnees du circuit VTT {circuit}\n"
    js_content += f"let coordsCircuitVtt{circuit} = [\n"

    for track in gpx.tracks:
        for segment in track.segments:
            for point in segment.points:
                js_content += f"  [{point.longitude}, {point.latitude}],\n"

    js_content += "];\n\n"

    with open(js_file, 'a') as js:  # 'a' pour ajouter les coordonnées au fichier sans écraser son contenu existant
        js.write(js_content)

    print(f"Les coordonnées du circuit {circuit} ont été ajoutées au fichier JavaScript.")

if __name__ == "__main__":
    circuits = ["20", "28", "36", "41", "48"]
    output_js_file = "./js/coordsCircuitsVtt.js"

    # Vider le fichier JavaScript s'il existe déjà
    if os.path.exists(output_js_file):
        clear_file(output_js_file)

    for circuit in circuits:
        input_gpx_file = f"./fichiers/VTT/{circuit}.gpx"
        gpx_to_js(input_gpx_file, output_js_file, circuit)

    print("Toutes les conversions sont terminées.")
