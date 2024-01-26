const express = require('express');
const { MongoClient } = require('mongodb');
const generateFpid = require('../../middleware/flightPlanIDGen.js')
const dotenv = require('dotenv');
const axios = require('axios')

dotenv.config();

const url = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DBN;

const AddFlightPlanFromSimbrief = async (req, res) => {

    // Get the current date and time
    const currentDate = new Date();

    // Convert the date to a timestamp (milliseconds since January 1, 1970)
    const timestamp = currentDate.getTime();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    const uid = req.body.uid;
    const simbrief = req.body.simbrief;

    console.log({ UID: uid, Simbrief: simbrief })
    try {
        const client = new MongoClient(url, { useUnifiedTopology: true });
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection('flightPlans');

        const fpresponse = await axios.get(`https://www.simbrief.com/api/xml.fetcher.php?userid=${simbrief}&json=1`);
        const fpid = await generateFpid();

        const fpd = fpresponse.data

        const equipString = fpd.aircraft.equip;

        // Separate "M" and the rest of the string
        const WakeTurbulence = equipString.charAt(0); // Get the first character
        const Equipment = equipString.substring(2);

        const blk = {
            blkHour: fpd.api_params.stehour,
            blkMin: fpd.api_params.stemin
        }

        const dephourString = fpd.api_params.dephour;
        const dephourNumber = parseInt(dephourString, 10);

        const depminString = fpd.api_params.depmin;
        const depminNumber = parseInt(depminString, 10);

        const depTime = dephourNumber + depminNumber

        const blkHourString = blk.blkHour
        const blkHourNumber = parseInt(blkHourString, 10);
        const blkMinString = blk.blkMin
        const blkMinNumber = parseInt(blkMinString, 10);

        const blkTime = blkHourNumber + blkMinNumber

        const arrTime = depTime + blkTime

        const depHour = String(Math.floor(fpd.api_params.dephour / 3600)).padStart(2, '0');
        const depMin = String(Math.floor((fpd.api_params.depmin % 3600) / 60)).padStart(2, '0');

        const blockTimeHour = String(Math.floor(blk.blkHour / 3600)).padStart(2, '0');
        const blockTimeMinute = String(Math.floor((blk.blkMin % 3600) / 60)).padStart(2, '0');

        const estHours = String(Math.floor(fpd.times.est_time_enroute / 3600)).padStart(2, '0');
        const estMinutes = String(Math.floor((fpd.times.est_time_enroute % 3600) / 60)).padStart(2, '0');

        const airHours = String(Math.floor(fpd.times.sched_time_enroute / 3600)).padStart(2, '0');
        const airMinutes = String(Math.floor((fpd.times.sched_time_enroute % 3600) / 60)).padStart(2, '0');

        const arrHour = String(Math.floor(arrTime / 3600)).padStart(2, '0');
        const arrMin = String(Math.floor((arrTime % 3600) / 60)).padStart(2, '0');

        const DEP_Time = `${depHour}:${depMin}`
        const Arr_Time = `${arrHour}:${arrMin}`
        const EST_Time = `${estHours}:${estMinutes}`
        const BlockTime = `${blockTimeHour}:${blockTimeMinute}`
        const Air_Time = `${airHours}:${airMinutes}`

        const flightPlanData = {
            ident: {
                uid: uid,
                flightPlanId: fpid,
                time_create: timestamp,
                date_create: formattedDate,
                time_update: "INOP",
                airac: fpd.params.airac,
                ofp_layout: fpd.params.ofp_layout,
                units: fpd.params.units
            },
            flightPlan: {
                general: {
                    icao_airline: fpd.general.icao_airline,
                    flight_number: fpd.general.flight_number,
                    callsign: fpd.atc.callsign,
                    gc_distance: fpd.general.gc_distance,
                    route_distance: fpd.general.route_distance,
                    air_distance: fpd.general.air_distance,
                    total_burn: fpd.general.total_burn,
                    cruise_tas: fpd.general.cruise_tas,
                    cruise_mach: fpd.general.cruise_mach,
                    passengers: fpd.general.passengers,
                    route: fpd.general.route,
                    speed: fpd.atc.initial_spd,
                    speed_unit: fpd.atc.initial_spd_unit,
                    altitude: fpd.atc.initial_alt,
                    altitude_unit: fpd.atc.initial_alt_unit,
                    remark: fpd.atc.section18,
                    times: {
                        block_time_second: blkTime,
                        dep_time: DEP_Time,
                        arr_time: Arr_Time,
                        est_time: EST_Time,
                        air_time: Air_Time,
                        block_time: BlockTime,
                        orig_timezone: fpd.times.orig_timezone,
                        dest_timezone: fpd.times.dest_timezone
                    }
                },
                origin: {
                    icao_code: fpd.origin.icao_code,
                    iata_code: fpd.origin.iata_code,
                    faa_code: fpd.origin.faa_code,
                    elevation: fpd.origin.elevation,
                    latitude: fpd.origin.pos_lat,
                    longitude: fpd.origin.pos_lon,
                    name: fpd.origin.name,
                    timezone: fpd.origin.timezone,
                    plan_rwy: fpd.origin.plan_rwy,
                    trans_alt: fpd.origin.trans_alt,
                    trans_level: fpd.origin.trans_level,
                    metar: fpd.origin.metar,
                    metar_time: fpd.origin.metar,
                    metar_category: fpd.origin.metar_category,
                    metar_visibility: fpd.origin.metar_visibility,
                    metar_ceiling: fpd.origin.metar_ceiling,
                    taf: fpd.origin.taf,
                    taf_time: fpd.origin.taf_time,
                    atis: fpd.origin.atis,
                    notam: fpd.origin.notam
                },
                destination: {
                    icao_code: fpd.destination.icao_code,
                    iata_code: fpd.destination.iata_code,
                    faa_code: fpd.destination.faa_code,
                    elevation: fpd.destination.elevation,
                    latitude: fpd.destination.pos_lat,
                    longitude: fpd.destination.pos_lon,
                    name: fpd.destination.name,
                    timezone: fpd.destination.timezone,
                    plan_rwy: fpd.destination.plan_rwy,
                    trans_alt: fpd.destination.trans_alt,
                    trans_level: fpd.destination.trans_level,
                    metar: fpd.destination.metar,
                    metar_time: fpd.destination.metar,
                    metar_category: fpd.destination.metar_category,
                    metar_visibility: fpd.destination.metar_visibility,
                    metar_ceiling: fpd.destination.metar_ceiling,
                    taf: fpd.destination.taf,
                    taf_time: fpd.destination.taf_time,
                    atis: fpd.destination.atis,
                    notam: fpd.destination.notam
                },
                alternate: {
                    icao_code: fpd.alternate.icao_code,
                    iata_code: fpd.alternate.iata_code,
                    faa_code: fpd.alternate.faa_code,
                    elevation: fpd.alternate.elevation,
                    latitude: fpd.alternate.pos_lat,
                    longitude: fpd.alternate.pos_lon,
                    name: fpd.alternate.name,
                    timezone: fpd.alternate.timezone,
                    plan_rwy: fpd.alternate.plan_rwy,
                    trans_alt: fpd.alternate.trans_alt,
                    trans_level: fpd.alternate.trans_level,
                    distance: fpd.alternate.distance,
                    gc_distance: fpd.alternate.gc_distance,
                    air_distance: fpd.alternate.air_distance,
                    metar: fpd.alternate.metar,
                    taf: fpd.alternate.taf,
                    taf_time: fpd.alternate.taf_time,
                    atis: fpd.alternate.atis,
                    notam: fpd.alternate.notam
                },
                atc: {
                    flightplan_text: fpd.atc.flightplan_text,
                    route: fpd.atc.route,
                    route_ifps: fpd.atc.route_ifps,
                },
                aircraft: {
                    icaocode: fpd.aircraft.icaocode,
                    iatacode: fpd.aircraft.iatacode,
                    base_type: fpd.aircraft.base_type,
                    icao_code: fpd.aircraft.icao_code,
                    iata_code: fpd.aircraft.iata_code,
                    name: fpd.aircraft.name,
                    reg: fpd.aircraft.reg,
                    selcal: fpd.aircraft.selcal,
                    wake_turbulene: WakeTurbulence,
                    equipment: Equipment,
                    fuelfact: fpd.aircraft.fuelfact,
                    fuelfactor: fpd.aircraft.fuelfactor,
                    max_passengers: fpd.aircraft.max_passengers,
                    internal_id: fpd.aircraft.internal_id
                },
                weights: {
                    oew: fpd.weights.oew,
                    pax_count: fpd.weights.pax_count,
                    bag_count: fpd.weights.bag_count,
                    pax_count_actual: fpd.weights.pax_count_actual,
                    bag_count_actual: fpd.weights.bag_count_actual,
                    pax_weight: fpd.weights.pax_weight,
                    bag_weight: fpd.weights.bag_weight,
                    freight_added: fpd.weights.freight_added,
                    cargo: fpd.weights.cargo,
                    payload: fpd.weights.payload,
                    est_zfw: fpd.weights.est_zfw,
                    max_zfw: fpd.weights.max_zfw,
                    est_tow: fpd.weights.est_tow,
                    max_tow: fpd.weights.max_tow,
                    max_tow_struct: fpd.weights.max_tow_struct,
                    tow_limit_code: fpd.weights.tow_limit_code,
                    est_ldw: fpd.weights.est_ldw,
                    max_ldw: fpd.weights.max_ldw,
                    est_ramp: fpd.weights.est_ramp
                },
                navlog: fpd.navlog,
                plan_html: fpd.text.plan_html
            }
        };

        const results = flightPlanData

        await collection.insertOne(results);

        await res.status(200).json({ Status: 200, FlightPlan: results });
    } catch (error) {
        console.error('Error adding flight plan:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const GetFlightPlan = async (req, res) => {

    const userId = req.user.uid

    const client = new MongoClient(url, { useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('flightPlans');

        // Find documents for the given user
        const fpdCursor = collection.find({ 'ident.uid': userId });

        // Convert the cursor to an array
        const flightPlanDataArray = await fpdCursor.toArray();

        // Calculate the sum of block_time_second values
        const totalBlockTimeSeconds = flightPlanDataArray.reduce((sum, doc) => sum + doc.flightPlan.general.times.block_time_second, 0);

        // Convert total seconds to hours and minutes
        const hours = Math.floor(totalBlockTimeSeconds / 3600);
        const minutes = Math.floor((totalBlockTimeSeconds % 3600) / 60);

        // Format the result as "HH:mm"
        const formattedTotalBlockTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

        // Add the totalBlockTime to the response
        const responseWithTotalBlockTime = {
            flightPlanDataArray,
            flightTime: {
                total: flightPlanDataArray.length,
                format: formattedTotalBlockTime,
                hour: hours,
                minute: minutes
            }
        };

        res.json(responseWithTotalBlockTime);
    } catch (error) {
        console.error(error)
    }
}
module.exports = {
    AddFlightPlanFromSimbrief,
    GetFlightPlan
}