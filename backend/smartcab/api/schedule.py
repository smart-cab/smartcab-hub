from flask import  Blueprint, send_file, request
from smartcab.data import db
from smartcab.data.schedule import Schedule
from pandas import ExcelWriter, read_sql, read_excel
from sqlalchemy import inspect, create_engine


blueprint = Blueprint(
    name="schedule", 
    import_name=__name__
)

@blueprint.route("/load_schedule", methods=["POST"])
def load_schedule():
    if 'file' not in request.files:
        return 'No file part'

    file = request.files['file']
    df = read_excel(file)
    engine = create_engine(db.get_db_url())

    if 'id' not in df.columns:
        df['id'] = range(1, len(df) + 1)

    df = df.rename(columns={"Начало урока": "lesson_start",
                            "Окончание урока": "lesson_end"})

    df.to_sql('schedule', con=engine, if_exists='replace', index=False)
    

    return {"status": "ok"}


@blueprint.route("/export_schedule", methods=["GET"])
def export_schedule():
    engine = create_engine(db.get_db_url())
    excel_file_path = 'db/schedule.xlsx'
    with ExcelWriter(excel_file_path) as writer:
        query = f"SELECT * FROM schedule"
        df = read_sql(query, engine)
        df.to_excel(writer, sheet_name="schedule", index=False)
    return send_file(f"../{excel_file_path}", as_attachment=True)


@blueprint.route("/get_schedule", methods=["GET"])
def get_schedule():
    print("-------------")
    with db.session() as db_sess:
        print("0000000000000", 
        db_sess.query(Schedule).all()
        )
    return {}
        
