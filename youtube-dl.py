import json
from flask import Flask, request, jsonify, render_template
from flask.helpers import make_response
from modulos import pafy


app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'] )
def home_view():
    if request.method == 'POST':
        try:
            videourl = request.form.get("videoUrl", "www.youtube.com/watch?v=2Z4m4lnjxkY")
            video = pafy.new(videourl)
            streams = video.streams
            streams_info = []
            for s in streams:
                streams_info.append((s.resolution, s.extension, s.get_filesize(), s.url))

            videoInfo = {
                "title": video.title,
                "author": video.author,
                "url": "http://www.youtube.com/watch?v=" + video.videoid,
                "duration": video.duration,
                "thumbnail": video.thumb,
                "streams": streams_info
            }
            return jsonify({"sucesso": True, "video": videoInfo})
        except ValueError, e:
            return jsonify({"sucesso": False, 'error': e.message})

    else:
        return render_template("index.html")


if __name__ == '__main__':
    app.run()
