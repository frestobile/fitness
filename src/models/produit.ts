// import { GESTURE_REFRESHER } from "ionic-angular/umd";

import { SingleObjet } from "./entity";

export class Produit {

	public id: number;
	public warranty: number;
	public list_price: number;
	public weight: number;
	public sequence: number;
	public color: number;
	public write_uid: SingleObjet;
	public image_128: string;
	public uom_id: SingleObjet;
	public description_purchase: string;
	public create_date: string;
	public qty_available: number;
	public create_uid: SingleObjet;
	public sale_ok: boolean;
	public sales_count: number;
	public categ_id: SingleObjet;
	public product_manager: SingleObjet;
	public message_last_post: string;
	public company_id: SingleObjet;
	// public state;
	public uom_po_id: SingleObjet;
	public description_sale: string;
	public description: string;
	public volume: number;
	public write_date: string;
	public active: boolean;
	public rental: boolean;
	public name: string;
	public type: string;
	public track_service: string;
	public invoice_policy: string;
	public description_picking: string;
	public sale_delay: number;
	public tracking: string;
	public available_in_pos: boolean;
	public pos_categ_id: SingleObjet;
	public to_weight: boolean;
	public purchase_ok: boolean;
	public purchase_method: string;
	public produce_delay: number;
	public deferred_revenue_category_id: SingleObjet;
	public asset_category_id: SingleObjet;
	public recurring_invoice: boolean;
	public project_id: SingleObjet;
	public landed_cost_ok: boolean;
	public split_method: string;
	public event_type_id: SingleObjet;
	public event_ok: boolean;
	public currency_id: SingleObjet;
	public incoming_qty: number;
	public outgoing_qty: number;
	public product_variant_ids: number[];
	public default_code: string;


	constructor(serverJSON?: any) {
		
		if (serverJSON !== undefined) 
			this.setProduit(serverJSON);
		else 
			this.createProduit();
	}

	

	/** Cette fonction permet de définir 
     * les valeurs des champs
     * @param data JSONObject, il s'agit des données JSON du serveur
     *
     ***/
	setProduit(data: any) {
		this.id = data.me.id.me;

		if (data.me.name === undefined || !data.me.name.me) this.name = '';
		else this.name = data.me.name.me;

		if (!data.me.type.me || data.me.type == undefined) this.type = '';
		else this.type = data.me.type.me;

		if (data.me.image_128 === undefined || !data.me.image_128.me) this.image_128 = '';
		else this.image_128 = data.me.image_128.me;

		if (data.me.track_service == undefined || !data.me.track_service.me) this.track_service = '';
		else this.track_service = data.me.track_service.me;
		if (data.me.invoice_policy == undefined || !data.me.invoice_policy.me) this.invoice_policy = '';
		else this.invoice_policy = data.me.invoice_policy.me;

		if (data.me.description_picking == undefined || !data.me.description_picking.me) this.description_picking = '';
		else this.description_picking = data.me.description_picking.me;
		if (data.me.sale_delay == undefined || !data.me.sale_delay.me) this.sale_delay = 0;
		else this.sale_delay = data.me.sale_delay.me;
		if (data.me.sales_count == undefined || !data.me.sales_count.me) this.sales_count = 0;
		else this.sales_count = data.me.sales_count.me;
		if (data.me.qty_available == undefined || !data.me.qty_available.me) this.qty_available = 0;
		else this.qty_available = data.me.qty_available.me;
		if (data.me.outgoing_qty == undefined || !data.me.outgoing_qty.me) this.outgoing_qty = 0;
		else this.outgoing_qty = data.me.outgoing_qty.me;
		if (data.me.incoming_qty == undefined || !data.me.incoming_qty.me) this.incoming_qty = 0;
		else this.incoming_qty = data.me.incoming_qty.me;
		if (data.me.tracking == undefined || !data.me.tracking.me) this.tracking = '';
		else this.tracking = data.me.tracking.me;

		if (data.me.available_in_pos === undefined || !data.me.available_in_pos.me) this.available_in_pos = false;
		else this.available_in_pos = data.me.available_in_pos.me;

		if (data.me.to_weight === undefined || !data.me.to_weight.me) this.to_weight = false;
		else this.to_weight = data.me.to_weight.me;

		if (data.me.purchase_method == undefined || !data.me.purchase_method.me) this.purchase_method = '';
		else this.purchase_method = data.me.purchase_method.me;
		if (data.me.produce_delay == undefined || !data.me.produce_delay.me) this.produce_delay = 0;
		else this.produce_delay = data.me.produce_delay.me;

		if (data.me.recurring_invoice === undefined || !data.me.recurring_invoice.me) this.recurring_invoice = false;
		else this.recurring_invoice = data.me.recurring_invoice.me;

		if (data.me.landed_cost_ok === undefined || !data.me.landed_cost_ok.me) this.landed_cost_ok = false;
		else this.landed_cost_ok = data.me.landed_cost_ok.me;

		if (data.me.split_method == undefined || !data.me.split_method.me) this.split_method = '';
		else this.split_method = data.me.split_method.me;

		if (data.me.event_ok == undefined || !data.me.event_ok.me) this.event_ok = false;
		else this.event_ok = data.me.event_ok.me;

		if (data.me.warranty == undefined || !data.me.warranty.me)
			this.warranty = 0.0;
		else this.warranty = data.me.warranty.me;

		if (data.me.list_price == undefined || !data.me.list_price.me)
			this.list_price = 0;
		else this.list_price = data.me.list_price.me;

		this.active = data.me.active.me;

		if (data.me.rental == undefined || !data.me.rental.me) this.rental = false;
		else this.rental = data.me.rental.me;
		if (data.me.default_code == undefined || !data.me.default_code.me) this.default_code = '';
		else this.default_code = data.me.default_code.me;

		if (data.me.sequence == undefined || !data.me.sequence.me) this.sequence = 0;
		else this.sequence = data.me.sequence.me;

		if (data.me.color == undefined || !data.me.color.me) this.color = 0;
		else this.color = data.me.color.me;

		if (data.me.description_purchase == undefined || !data.me.description_purchase.me)
			this.description_purchase = '';
		else this.description_purchase = data.me.description_purchase.me;

		if (!data.me.create_date.me || data.me.create_date == undefined) this.create_date = '';
		else this.create_date = data.me.create_date.me;
		if (!data.me.write_date.me || data.me.write_date == undefined) this.write_date = '';
		else this.write_date = data.me.write_date.me;

		if (data.me.sale_ok == undefined || !data.me.sale_ok.me) this.sale_ok = false;
		else this.sale_ok = data.me.sale_ok.me;

		if (data.me.volume == undefined || !data.me.volume.me) this.volume = 0;
		else this.volume = data.me.volume.me;

		if (data.me.categ_id == undefined || !data.me.categ_id.me) 
			this.categ_id = { id: 0, name: '' };
		else 
			this.categ_id = { id: data.me.categ_id.me[0].me, name: data.me.categ_id.me[1].me };

		if (data.me.description_sale == undefined || !data.me.description_sale.me )
			this.description_sale = '';
		else this.description_sale = data.me.description_sale.me;


		if (data.me.message_last_post == undefined || !data.me.message_last_post.me)
			this.message_last_post = "";
		else this.message_last_post = data.me.message_last_post.me;

		if (data.me.company_id == undefined || !data.me.company_id.me)
			this.company_id = { id: 0, name: '' };
		else this.company_id = { id: data.me.company_id.me[0].me, name: data.me.company_id.me[1].me };

		if (data.me.product_variant_ids == undefined || !data.me.product_variant_ids.me || data.me.product_variant_ids.me.length == 0)
			this.product_variant_ids = [];
		else 
			this.product_variant_ids = this.getIdTabs(data.me.product_variant_ids.me);

		if (data.me.uom_po_id == undefined || !data.me.uom_po_id.me)
			this.uom_po_id = { id: 0, name: '' };
		else 
			this.uom_po_id = { id: data.me.uom_po_id.me[0].me, name: data.me.uom_po_id.me[1].me };

		if (data.me.asset_category_id == undefined || !data.me.asset_category_id.me)
			this.asset_category_id = { id: 0, name: '' };
		else
			this.asset_category_id = {
				id: data.me.asset_category_id.me[0].me,
				name: data.me.asset_category_id.me[1].me
			};


		if (data.me.create_uid == undefined || !data.me.create_uid.me)
			this.create_uid = { id: 0, name: '' };
		else
			this.create_uid = {
				id: data.me.create_uid.me[0].me,
				name: data.me.create_uid.me[1].me
			};

		if (data.me.deferred_revenue_category_id == undefined || !data.me.deferred_revenue_category_id.me)
			this.deferred_revenue_category_id = { id: 0, name: '' };
		else
			this.deferred_revenue_category_id = {
				id: data.me.deferred_revenue_category_id.me[0].me,
				name: data.me.deferred_revenue_category_id.me[1].me
			};

		if (data.me.event_type_id == undefined || !data.me.event_type_id.me)
			this.event_type_id = { id: 0, name: '' };
		else
			this.event_type_id = {
				id: data.me.event_type_id.me[0].me,
				name: data.me.event_type_id.me[1].me
			};

		if (data.me.pos_categ_id == undefined || !data.me.pos_categ_id.me)
			this.pos_categ_id = { id: 0, name: '' };
		else
			this.pos_categ_id = {
				id: data.me.pos_categ_id.me[0].me,
				name: data.me.pos_categ_id.me[1].me
			};

		if (data.me.product_manager == undefined || !data.me.product_manager.me)
			this.product_manager = { id: 0, name: '' };
		else
			this.product_manager = {
				id: data.me.product_manager.me[0].me,
				name: data.me.product_manager.me[1].me
			};

		if (data.me.uom_id == undefined || !data.me.uom_id.me)
			this.uom_id = { id: 0, name: '' };
		else
			this.uom_id = {
				id: data.me.uom_id.me[0].me,
				name: data.me.uom_id.me[1].me
			};

		if (data.me.write_uid == undefined || !data.me.write_uid.me)
			this.write_uid = { id: 0, name: '' };
		else
			this.write_uid = {
				id: data.me.write_uid.me[0].me,
				name: data.me.write_uid.me[1].me
			};

		if (data.me.currency_id == undefined || !data.me.currency_id.me)
			this.currency_id = { id: 0, name: '' };
		else
			this.currency_id = {
				id: data.me.currency_id.me[0].me,
				name: data.me.currency_id.me[1].me
			};
	}

	/** set up type **/
	setType(type: string) {
		this.type = type;
	}

	getType() {
		return this.type;
	}

	//On créé un objet de type produit
	createProduit() {

		this.currency_id = { id: 0, name: 'XOF' };
		this.id = 0;
		this.incoming_qty = 0.0;
		this.outgoing_qty = 0.0;
		this.default_code = '';
		this.warranty = 0.0;
		this.list_price = 1.0;
		this.weight = 0;
		this.sequence = 0;
		this.color = 0;
		this.write_uid = { id: 0, name: '' };
		this.uom_id = { id: 0, name: 'Unité(s)' };
		this.description_purchase = '';
		this.create_date = '';
		this.create_uid = { id: 0, name: '' };
		this.sale_ok = true;
		this.categ_id = { id: 0, name: '' };
		this.product_manager = { id: 0, name: '' };
		this.message_last_post = '';
		this.company_id = { id: 0, name: '' };
		// this.state = '';
		this.uom_po_id = { id: 0, name: 'Unité(s)' };
		this.description_sale = '';
		this.description = '';
		this.volume = 0;
		this.write_date = '';
		this.active = true;
		this.rental = false;
		this.name = '';
		this.type = 'consu';
		this.track_service = '';
		this.invoice_policy = 'order';
		this.description_picking = '';
		this.sale_delay = 7.0;
		this.sales_count = 0;
		this.tracking = '';
		this.image_128 = '';
		this.available_in_pos = true;
		this.pos_categ_id = { id: 0, name: '' };
		this.to_weight = false;
		this.purchase_ok = true;
		this.purchase_method = 'receive';
		this.produce_delay = 1.0;
		this.qty_available = 0;
		this.deferred_revenue_category_id = { id: 0, name: '' };
		this.asset_category_id = { id: 0, name: '' };
		this.recurring_invoice = false;
		this.project_id = { id: 0, name: '' };
		this.landed_cost_ok = false;
		this.split_method = '';
		this.event_type_id = { id: 0, name: '' };
		this.event_ok = false;
		this.product_variant_ids = [];
	}

	//Cette fonction permet de générer un tableau
	//d'identifiant
	private getIdTabs(liste: any[]) {
		let tab = [];

		for (var i = 0; i < liste.length; i++) {
			tab.push(liste[i].me);
		}

		return tab;
	}
}
