export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      "Domande Iniziali": {
        Row: {
          academic: number | null
          business: number | null
          consulting: number | null
          domanda: string
          enterp: number | null
          finance: number | null
          id: string
          opzione: string | null
          policy: number | null
          testo_opzione: string | null
        }
        Insert: {
          academic?: number | null
          business?: number | null
          consulting?: number | null
          domanda: string
          enterp?: number | null
          finance?: number | null
          id: string
          opzione?: string | null
          policy?: number | null
          testo_opzione?: string | null
        }
        Update: {
          academic?: number | null
          business?: number | null
          consulting?: number | null
          domanda?: string
          enterp?: number | null
          finance?: number | null
          id?: string
          opzione?: string | null
          policy?: number | null
          testo_opzione?: string | null
        }
        Relationships: []
      }
      "Domande Secondarie": {
        Row: {
          AM: number | null
          Big_Tech: number | null
          Big4: number | null
          CFO: number | null
          Corporate: number | null
          Diplom: number | null
          domanda: string | null
          Giornalista: number | null
          HF: number | null
          IB: number | null
          id: string
          macroarea: string
          MBB: number | null
          microarea_group: string | null
          opzione: string | null
          Org_Int: number | null
          PE: number | null
          PM: number | null
          Policy: number | null
          Quant: number | null
          Ricercatore: number | null
          Start_up: number | null
          testo_opzione: string | null
          VC: number | null
        }
        Insert: {
          AM?: number | null
          Big_Tech?: number | null
          Big4?: number | null
          CFO?: number | null
          Corporate?: number | null
          Diplom?: number | null
          domanda?: string | null
          Giornalista?: number | null
          HF?: number | null
          IB?: number | null
          id: string
          macroarea: string
          MBB?: number | null
          microarea_group?: string | null
          opzione?: string | null
          Org_Int?: number | null
          PE?: number | null
          PM?: number | null
          Policy?: number | null
          Quant?: number | null
          Ricercatore?: number | null
          Start_up?: number | null
          testo_opzione?: string | null
          VC?: number | null
        }
        Update: {
          AM?: number | null
          Big_Tech?: number | null
          Big4?: number | null
          CFO?: number | null
          Corporate?: number | null
          Diplom?: number | null
          domanda?: string | null
          Giornalista?: number | null
          HF?: number | null
          IB?: number | null
          id?: string
          macroarea?: string
          MBB?: number | null
          microarea_group?: string | null
          opzione?: string | null
          Org_Int?: number | null
          PE?: number | null
          PM?: number | null
          Policy?: number | null
          Quant?: number | null
          Ricercatore?: number | null
          Start_up?: number | null
          testo_opzione?: string | null
          VC?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
